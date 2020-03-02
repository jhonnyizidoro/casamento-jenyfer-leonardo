window.LazyLoad = require('./modules/LazyLoad')
window.Gallery = require('./modules/Gallery')
window.Mask = require('./modules/Mask')
window.Countdown = require('./modules/Countdown')
window.Navbar = require('./modules/Navbar')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	Gallery.init()
	Mask.init()
	Countdown.init()
	Navbar.init()
	if (navigator.serviceWorker && !location.href.includes('localhost')) {
		navigator.serviceWorker.register('/sw.js')
	}
})