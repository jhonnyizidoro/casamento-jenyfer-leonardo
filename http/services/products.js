const conn = require('../db/conn')

const getProducts = params => new Promise((resolve, reject) => {
	const db = conn()
	const query = `SELECT * FROM products WHERE name LIKE '%${params.name || ''}%' AND category LIKE '%${params.category || ''}%' ORDER BY value`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const insertProduct = data => new Promise((resolve, reject) => {
	const db = conn()
	const query = `INSERT INTO products (name, value, category, image) VALUES (${db.escape(data.name)}, ${db.escape(data.value)}, ${db.escape(data.category)}, ${db.escape(data.image)})`
	db.query(query, (error, result) => {
		if (error) {
			if (error.code === 'ER_DUP_ENTRY') {
				reject('Já existe um produto com esse nome.')
			}
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getProducts,
	insertProduct,
}