const routes = require('./index/index'),
	error = require('./error/error')

module.exports = app => {
	app.use('/', routes)
	app.use('*', error)
}