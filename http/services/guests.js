const conn = require('../db/conn')

const getConfirmedGuests = () => new Promise((resolve, reject) => {
	const db = conn()
	const query = 'SELECT * FROM confirmations'
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const confirmGuest = data => new Promise((resolve, reject) => {
	const db = conn()
	const query = `INSERT INTO confirmations (name, song) VALUES (${db.escape(data.name)}, ${db.escape(data.song)})`
	db.query(query, (error, result) => {
		if (error) {
			if (error.code === 'ER_DUP_ENTRY') {
				reject('Você já confirmou presença.')
			}
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	confirmGuest,
	getConfirmedGuests,
}