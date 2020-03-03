const index = require('./index/index'),
	error = require('./error/error'),
	guests = require('./guests/guests'),
	products = require('./products/products')

module.exports = app => {
	app.use('/', index)
	app.use('/convidados', guests)
	app.use('/produtos', products)
	app.use('*', error)
}