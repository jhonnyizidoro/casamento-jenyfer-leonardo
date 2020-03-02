const mysql = require('mysql')

const getConnection = () => {
	const connection = mysql.createConnection({
		host: DATABASE.HOST,
		user: DATABASE.USER,
		password: DATABASE.PASSWORD,
		database: DATABASE.NAME,
	})
	connection.connect()
	return connection
}

const confirmGuest = guest => new Promise((resolve, reject) => {

	const connection = getConnection()
	const insertQuery = `INSERT INTO confirmations (name, song) VALUES ('${guest.name}', '${guest.song}')`
	const getQuery = `SELECT * FROM confirmations WHERE name = '${guest.name}'`

	connection.query(getQuery, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else if (result.length) {
			reject('Essa presença já estava confirmada!')
		}
	})

	connection.query(insertQuery, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})


module.exports = {
	confirmGuest,
}