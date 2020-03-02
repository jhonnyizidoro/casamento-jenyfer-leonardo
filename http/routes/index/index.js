const express = require('express'),
	router = express.Router(),
	{readdirSync} = require('fs'),
	path = require('path')

router.get('/', (req, res) => {
	const seo = {
		title: 'Jenyfer e Leonardo | Site do Casamento',
		description: 'Site para o grande dia de Jenyfer e Leonardo. Veja como vai funcionar o evento, peça uma música e confirme sua presença. Também é possível nos presentear por aqui!',
		keywords: 'site de casamento, lista de presentes, jenyfer e leonardo',
	}
	const gallery = readdirSync(`${path.dirname(require.main.filename)}/assets/images/gallery`)
	res.render('index', {
		seo,
		gallery
	})
	req.session.destroy()
})

module.exports = router