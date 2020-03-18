const mysql = require('mysql')

module.exports = () => {
	const connection = mysql.createConnection({
		host: DATABASE.HOST,
		user: DATABASE.USER,
		password: DATABASE.PASSWORD,
		database: DATABASE.NAME,
		timezone: 'UTC',
		multipleStatements: true,
	})
	connection.connect()
	return connection
}