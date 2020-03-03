import {on} from '../functions/EventHandler'

const init = () => {
	const alert = document.querySelector('.alert')
	const alertClose = document.querySelector('.alert button')
	on('click', alertClose, () => alert.parentNode.removeChild(alert))
}

export {
	init,
}