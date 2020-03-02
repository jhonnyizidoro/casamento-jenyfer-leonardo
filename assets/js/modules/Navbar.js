import {on} from '../functions/EventHandler'

const init = () => {
	const trigger = document.querySelector('.hamburger')
	const navbar = document.querySelector('.navbar__links')
	on('click', trigger, () => {
		if (navbar.classList.contains('is-active')) {
			trigger.classList.remove('is-active')
			navbar.classList.remove('is-active')
		} else {
			trigger.classList.add('is-active')
			navbar.classList.add('is-active')
		}
	})
}

export {
	init,
}