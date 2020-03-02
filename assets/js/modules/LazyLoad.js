const observe = imagesSelector => {
	const images = document.querySelectorAll(`${imagesSelector} img, ${imagesSelector}, ${imagesSelector} iframe`)
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				changeImageSrc(entry.target)
			}
		})
	})
	images.forEach(image => {
		observer.observe(image)
	})
}

const changeImageSrc = image => {
	if (image.src === '' && image.dataset.src) {
		image.src = image.dataset.src
		delete image.dataset.src
	}
}

export {
	observe,
}