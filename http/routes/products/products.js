const express = require('express'),
	router = express.Router(),
	{getProducts, insertProduct} = require('../../services/products')

router.get('/', (req, res) => {
	const seo = {
		title: 'Jenyfer e Leonardo | Lista Virtual',
		description: 'Produtos disponíveis para serem comprados na lista virtual. Lista virtual de presente de casamento.',
		keywords: 'site de casamento, lista de convidados, jenyfer e leonardo, presenças confirmadas, pedido de musica, lista virtual, produtos, presentes de casamento',
	}
	getProducts().then(products => {
		res.render('products', {
			seo,
			products
		})
	}).catch(err => {
		req.session.alert = {
			type: 'Erro!',
			message: err,
		}
		res.redirect(`/?${new Date().getTime()}`)
	})
})

router.get('/cadastrar', (req, res) => {
	const seo = {
		title: 'Jenyfer e Leonardo | Lista Virtual',
		description: 'Produtos disponíveis para serem comprados na lista virtual. Lista virtual de presente de casamento.',
		keywords: 'site de casamento, lista de convidados, jenyfer e leonardo, presenças confirmadas, pedido de musica, lista virtual, produtos, presentes de casamento',
	}
	res.render('productsForm', {
		seo,
	})
})

router.post('/', (req, res) => {
	req.body.image = req.files.image.data.toString('base64')
	req.body.value = req.body.value.replace(/R\$ |\./g, '').replace(',', '.')
	insertProduct(req.body).then(() => {
		req.session.alert = {
			type: 'Sucesso!',
			message: 'Produto cadastrado com sucesso!',
		}
	}).catch(err => {
		req.session.alert = {
			type: 'Erro!',
			message: err,
		}
	}).finally(() => {
		res.redirect(`/produtos/cadastrar/?${new Date().getTime()}`)
	})
})

module.exports = router