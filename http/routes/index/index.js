const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	const seo = {
		title: 'Home',
		description: 'The best SEO optimized Progressive Web App!',
		keywords: ['seo', 'optimized', 'pwa', 'progressive', 'web', 'app', 'home', 'pug', 'express', 'gulp', 'node', 'sass'],
	}
	res.render('index', {
		seo
	})
})

module.exports = router