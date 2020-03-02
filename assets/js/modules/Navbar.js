import {on} from '../functions/EventHandler'

const init = () => {
	const trigger = document.querySelector('.hamburger')
	const navbar = document.querySelector('.navbar__links')
	const links = document.querySelectorAll('.navbar__link')

	on('click', trigger, () => {
		if (navbar.classList.contains('is-active')) {
			trigger.classList.remove('is-active')
			navbar.classList.remove('is-active')
		} else {
			trigger.classList.add('is-active')
			navbar.classList.add('is-active')
		}
	})

	on('click', links, () => {
		trigger.classList.remove('is-active')
		navbar.classList.remove('is-active')
	})
}

export {
	init,
}