import VMasker from 'vanilla-masker'
import {on} from '../functions/EventHandler'

const mask = () => {
	const inputs = document.querySelectorAll('[data-mask]')
	inputs.forEach(input => {
		const mask = input.dataset.mask
		if (mask === 'money') {
			VMasker(input).maskMoney({
				precision: 2,
				unit: 'R$'
			})
		} else {
			VMasker(input).maskPattern(mask)
		}
	})
}

const file = () => {
	const inputs = document.querySelectorAll('.default__file')
	on('change', inputs, input => {
		const name = input.files[0].name
		input.dataset.placeholder = name.length > 40 ? `${name.slice(0,37)}...` : name
	})
}

export {
	mask,
	file,
}