const express = require('express'),
	router = express.Router(),
	{confirmGuest, getConfirmedGuests} = require('../../services/services')

router.get('/', (req, res) => {
	const seo = {
		title: 'Jenyfer e Leonardo | Convidados Confirmados',
		description: 'Convidados que já confirmaram presença no casamento de Jenyfer e Leonardo. Vejas aqui as músicas que cada um deles solicitou e quando confirmaram a presença no casamento.',
		keywords: 'site de casamento, lista de convidados, jenyfer e leonardo, presenças confirmadas, pedido de musica',
	}

	getConfirmedGuests()
		.then(guests => {
			res.render('guests', {
				seo,
				guests
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

router.post('/', (req, res) => {
	const guest = {
		name: req.body.name,
		song: req.body.song,
	}

	confirmGuest(guest)
		.then(() => {
			req.session.alert = {
				type: 'Sucesso!',
				message: 'Presença confirmada com sucesso!',
			}
		})
		.catch(err => {
			req.session.alert = {
				type: 'Erro!',
				message: err,
			}
		})
		.finally(() => {
			res.redirect(`/?${new Date().getTime()}`)
		})
})

module.exports = router