window.LazyLoad = require('./modules/LazyLoad')
window.Gallery = require('./modules/Gallery')
window.Mask = require('./modules/Mask')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	Gallery.init()
	Mask.init()
	if (navigator.serviceWorker && !location.href.includes('localhost')) {
		navigator.serviceWorker.register('/sw.js')
	}
})