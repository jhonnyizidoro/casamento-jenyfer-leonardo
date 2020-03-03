const express = require('express'),
	router = express.Router(),
	{getProducts} = require('../../services/services')

router.get('/', (req, res) => {
	const seo = {
		title: 'Jenyfer e Leonardo | Lista Virtual',
		description: 'Produtos disponíveis para serem comprados na lista virtual. Lista virtual de presente de casamento.',
		keywords: 'site de casamento, lista de convidados, jenyfer e leonardo, presenças confirmadas, pedido de musica, lista virtual, produtos, presentes de casamento',
	}

	getProducts()
		.then(products => {
			res.render('products', {
				seo,
				products
			})
		})
		.catch(err => {
			req.session.alert = {
				type: 'Erro!',
				message: err,
			}
			res.redirect(`/?${new Date().getTime()}`)
		})
})

module.exports = router