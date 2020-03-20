const express = require('express'),
	router = express.Router(),
	{getProduct} = require('../../services/products'),
	mercadopago = require('mercadopago')

router.post('/', (req, res) => {
	getProduct(req.body.id).then(product => {
		const preferences = {
			payer: {
				name: req.body.name,
			},
			items: [
				{
					title: product.name,
					unit_price: product.value,
					quantity: 1,
				},
			],
		}
		mercadopago.configure({
			access_token: MERCADOPAGO.ACCESS_TOKEN
		})
		mercadopago.preferences.create(preferences)
			.then(payment => res.json(payment.response))
			.catch(err => {
				res.status(500)
				res.json(err)
			})
	}).catch(err => {
		res.status(500)
		res.json(err)
	})
})

module.exports = router