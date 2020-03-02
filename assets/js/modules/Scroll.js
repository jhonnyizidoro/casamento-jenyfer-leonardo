import {on} from '../functions/EventHandler'
import jump from 'jump.js'

const init = () => {
	const buttons = document.querySelectorAll('[data-scroll]')
	on('click', buttons, button => {
		jump(button.dataset.scroll, {
			offset: -150,
			duration: 1000,
		})
	})
}

export {
	init,
}