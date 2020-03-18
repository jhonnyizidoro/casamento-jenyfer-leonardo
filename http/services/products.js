const conn = require('../db/conn')

const getProducts = () => new Promise((resolve, reject) => {
	const db = conn()
	const query = 'SELECT * FROM products'

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
	console.log(query)

	db.query(query, (error, result) => {
		if (error) {
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