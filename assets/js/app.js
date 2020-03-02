window.LazyLoad = require('./modules/LazyLoad')
window.Gallery = require('./modules/Gallery')
window.Countdown = require('./modules/Countdown')
window.Navbar = require('./modules/Navbar')
window.Scroll = require('./modules/Scroll')
window.Alert = require('./modules/Alert')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	Gallery.init()
	Countdown.init()
	Navbar.init()
	Scroll.init()
	Alert.init()
	if (navigator.serviceWorker && !location.href.includes('localhost')) {
		navigator.serviceWorker.register('/sw.js')
	}
})