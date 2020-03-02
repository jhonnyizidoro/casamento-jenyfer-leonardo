const express = require('express'),
	router = express.Router(),
	{confirmGuest} = require('../services/services')

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