const moneyToFloat = string => string.replace(/R\$ |\./g, '').replace(',', '.')
const getParam = param => new URL(url).searchParams.get(param)

const formatDate = date => {
	const formatted = {
		day: `0${date.getDate()}`.slice(-2),
		month: `0${date.getMonth() + 1}`.slice(-2),
		year: date.getFullYear(),
		hours: `0${date.getUTCHours()}`.slice(-2),
		minutes: `0${date.getUTCMinutes()}`.slice(-2),
	}
	return `${formatted.day}/${formatted.month}/${formatted.year} - ${formatted.hours}:${formatted.minutes}`
}

const formatMoney = value => {
	let formattedValue = value.toFixed(2)
	formattedValue = formattedValue.toString().replace(/\D/g,'')
	formattedValue = formattedValue.toString().replace(/(\d)(\d{8})$/,'$1.$2')
	formattedValue = formattedValue.toString().replace(/(\d)(\d{5})$/,'$1.$2')
	formattedValue = formattedValue.toString().replace(/(\d)(\d{2})$/,'$1,$2')
	return `R$ ${formattedValue}`
}

const getSchemaJSON = () => {
	return `
		{
			"@context": "https://www.schema.org",
			"@type": "Event",
			"name": "Casamento Jenyfer e Leonardo",
			"url": "https://www.casamentoleoejeny.com.br",
			"description": "Estamos feliz em anunciar que iremos nos casar. Faça parte desse momento tão especial!",
			"startDate": "${EVENT.MONTH}/${EVENT.DAY}/${EVENT.YEAR} ${EVENT.STARTS_AT}PM",
			"endDate": "${EVENT.MONTH}/${EVENT.DAY}/${EVENT.YEAR} ${EVENT.STARTS_AT}PM",
			"image": "${host}/favicon/android-chrome-512x512.png",
			"location": {
				"@type": "Place",
				"name": "${EVENT.LOCATION.NAME}",
				"sameAs": "http://www.querenciagaucha.com.br/",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "${EVENT.LOCATION.ADDRESS}",
					"addressLocality": "${EVENT.LOCATION.CITY}",
					"addressRegion": "${EVENT.LOCATION.CITY}",
					"postalCode": "${EVENT.LOCATION.POSTAL_CODE}",
					"addressCountry": "BRA"
				}
			},
			"performer": {
				"@type": "Person",
				"name": "Jhonny Izidoro Menarim",
				"sameAs": "https://github.com/jhonnyizidoro"
			}
		}
	`
}

module.exports = {
	getSchemaJSON,
	formatDate,
	formatMoney,
	moneyToFloat,
	getParam,
}