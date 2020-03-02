import {on} from '../functions/EventHandler'

const init = () => {
	const gallery = document.querySelector('.gallery')
	const galleryButton = document.querySelector('.gallery__button')
	on('click', galleryButton, () => {
		gallery.style.height = 'auto'
		galleryButton.parentNode.removeChild(galleryButton)
		gallery.classList.add('gallery--expanded')
	})
}

export {
	init,
}