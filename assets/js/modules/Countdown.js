const init = () => {

	const countdown = document.querySelector('.countdown')

	if (!countdown) {
		return
	}

	const date = new Date(countdown.dataset.target).getTime()
	const numbers = document.querySelectorAll('.countdown__number')

	setInterval(() => {

		const now = new Date().getTime()
		const distance = date - now

		numbers[0].innerText = Math.floor(distance / (1000 * 60 * 60 * 24))
		numbers[1].innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		numbers[2].innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		numbers[3].innerText = Math.floor((distance % (1000 * 60)) / 1000)

	}, 1000)
}

export {
	init,
}