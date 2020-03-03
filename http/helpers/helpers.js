const formatDate = date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getUTCHours()}:${date.getUTCMinutes()}`

//Examples: https://jsonld.com/
//Validator: https://search.google.com/structured-data/testing-tool
//Google docs: https://developers.google.com/search/reference/overview
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
	formatDate
}