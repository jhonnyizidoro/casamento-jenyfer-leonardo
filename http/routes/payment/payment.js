const express = require('express'),
	router = express.Router(),
	{getProduct} = require('../../services/products')

router.post('/', (req, res) => {
	getProduct(req.body.id).then(product => {
		console.log(product)
	}).catch(err => {
		console.log(err)
	})
})

module.exports = router