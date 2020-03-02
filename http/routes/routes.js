const index = require('./index/index'),
	error = require('./error/error'),
	guests = require('./guests/guests')

module.exports = app => {
	app.use('/', index)
	app.use('/convidados', guests)
	app.use('*', error)
}