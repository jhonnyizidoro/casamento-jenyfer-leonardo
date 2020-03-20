import {on} from '../functions/EventHandler'

const payment = () => {
	const payment = document.querySelector('.payment')
	const triggers = document.querySelectorAll('.product button')
	const close = payment.querySelector('button[type="button"]')
	const id = payment.querySelector('input[name="id"]')

	on('click', close, () => payment.classList.remove('payment--visible'))

	on('click', triggers, trigger => {
		payment.classList.add('payment--visible')
		id.value = trigger.id
	})

	on('submit', payment, event => {
		event.preventDefault()
		fetchPaymentId({
			id: id.value,
			name: payment.querySelector('input[name="name"]').value,
			message: payment.querySelector('textarea[name="message"]').value,
		})
	}, false)
}

const fetchPaymentId = data => {
	fetch('/pagamento', {
		method: 'POST',
		body: JSON.stringify(data)
	}).then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
}

export {
	payment,
}