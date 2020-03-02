window.LazyLoad = require('./modules/LazyLoad')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})