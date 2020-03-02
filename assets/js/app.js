import {on} from "./functions/EventHandler";

window.LazyLoad = require('./modules/LazyLoad')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	const gallery = document.querySelector('.gallery')
	const galleryButton = document.querySelector('.gallery__button')
	const figures = document.querySelectorAll('.gallery__figure')
	on('click', galleryButton, () => {
		gallery.style.maxHeight = '5000px'
		galleryButton.parentNode.removeChild(galleryButton)
		gallery.classList.add('gallery--expanded')
	})
})