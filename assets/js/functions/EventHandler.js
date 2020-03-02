import {isNodeList, isElement, isArray} from './DomManipulation'

const hasSpeechRecognition = () => window.SpeechRecognition || window.webkitSpeechRecognition || false

const on = (eventListeners, elements, callback, passive = true) => {
	let events = eventListeners
	if (typeof events === 'string') {
		events = [events]
	}
	events.forEach(eventName => {
		if (isNodeList(elements) || isArray(elements)) {
			elements.forEach(element => {
				element.addEventListener(eventName, event => callback(element, event), {passive})
			})
		} else if (isElement(elements)) {
			elements.addEventListener(eventName, event => callback(event), {passive})
		}
	})
}

const onDrag = (element, config, callback = config) => {

	const mobile = config.mobile || true
	const desktop = config.desktop || true
	const distance = config.distance || 1
	const direction = config.direction || 'horizontal'

	let axis = 'x'
	let startEvents = []
	let endEvents = []
	let movingEvents = []
	let dragging = false
	let currentPosition

	if (direction === 'vertical' || direction === 'up' || direction === 'down') {
		axis = 'y'
	}

	if (mobile) {
		startEvents.push('touchstart')
		endEvents.push('touchend')
		movingEvents.push('touchmove')
	}

	if (desktop) {
		startEvents.push('mousedown')
		endEvents.push('mouseup')
		movingEvents.push('mousemove')
		on('dragstart', element, event => event.preventDefault(), false)
	}

	on(startEvents, element, event => {
		dragging = true
		currentPosition = getCursorPosition(event, axis)
	})

	on(endEvents, document, () => {
		dragging = false
	})

	on(movingEvents, element, event => {
		if (dragging) {
			if (getCursorPosition(event, axis) > currentPosition + distance && direction !== 'up' && direction !== 'left') {
				currentPosition += distance
				if (direction === 'down' || direction === 'right') {
					callback()
				} else {
					callback(1)
				}
			} else if (getCursorPosition(event, axis) < currentPosition - distance && direction !== 'down' && direction !== 'right') {
				currentPosition -= distance
				if (direction === 'up' || direction === 'left') {
					callback()
				} else {
					callback(-1)
				}
			}
		}
	})
}
const getCursorPosition = (event, axis) => {
	if (axis === 'x') {
		if (event.pageX) {
			return event.pageX
		}
		return event.changedTouches[0].pageX
	} else {
		if (typeof event.pageY !== 'undefined') {
			return event.pageY
		}
		return event.changedTouches[0].pageY
	}
}

const getMicrophoneInput = callback => {
	window.SpeechRecognition = hasSpeechRecognition()
	if (!window.SpeechRecognition) {
		return
	}

	const recognition = new SpeechRecognition()
	recognition.lang = 'pt-BR'
	recognition.interimResults = true
	recognition.start()
	recognition.onerror = error => {
		callback({
			error: error.error,
			started: false,
			finished: true,
			string: ''
		})
	}
	recognition.onstart = () => {
		callback({
			error: false,
			started: true,
			finished: false,
			string: ''
		})
	}
	recognition.onresult = event => {
		callback({
			error: false,
			started: false,
			finished: event.results[0].isFinal,
			string: event.results[0][0].transcript
		})
	}
}

export {
	on,
	onDrag,
	getMicrophoneInput,
	hasSpeechRecognition,
}