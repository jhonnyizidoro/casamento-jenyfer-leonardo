const mysql = require('mysql')

const getConnection = () => {
	const conn = mysql.createConnection({
		host: DATABASE.HOST,
		user: DATABASE.USER,
		password: DATABASE.PASSWORD,
		database: DATABASE.NAME,
		timezone: 'UTC',
	})
	conn.connect()
	return conn
}

const getConfirmedGuests = () => new Promise((resolve, reject) => {
	const conn = getConnection()
	const query = 'SELECT * FROM confirmations'

	conn.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const confirmGuest = guest => new Promise((resolve, reject) => {

	const conn = getConnection()
	const insertQuery = `INSERT INTO confirmations (name, song) VALUES (${conn.escape(guest.name)}, ${conn.escape(guest.song)})`
	const getQuery = `SELECT * FROM confirmations WHERE name = ${conn.escape(guest.name)}`

	conn.query(getQuery, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else if (result.length) {
			reject('Essa presença já estava confirmada!')
		}
	})

	conn.query(insertQuery, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const getProducts = () => new Promise((resolve, reject) => {
	const conn = getConnection()
	const query = 'SELECT p.*, c.name AS category FROM producs AS p JOIN categories AS c ON p.category_id = c.id'

	conn.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	confirmGuest,
	getConfirmedGuests,
	getProducts,
}