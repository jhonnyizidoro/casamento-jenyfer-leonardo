import IMask from 'imask'

const init = () => {
	const maskeds = document.querySelectorAll('[data-mask]')
	maskeds.forEach(masked => new IMask(masked, { mask: masked.dataset.mask }))
}

export {
	init,
}