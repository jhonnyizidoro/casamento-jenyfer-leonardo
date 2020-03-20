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
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(res => res.json())
		.then(data => openCheckout(data.id))
		.catch(err => console.log(err))
}

const openCheckout = id => {
	const form = document.createElement('form')
	const script = document.createElement('script')
	script.src = 'https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js'
	script.setAttribute('data-preference-id', id)
	form.appendChild(script)
	form.style.display = 'none'
	document.body.appendChild(form)
	on('load', script, () => form.querySelector('button').click())
}

export {
	payment,
}