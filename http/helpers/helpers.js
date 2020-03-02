//Examples: https://jsonld.com/
//Validator: https://search.google.com/structured-data/testing-tool
//Google docs: https://developers.google.com/search/reference/overview
const getSchemaJSON = () => {
	return `
		{
			"@context": "http://schema.org",
			"@type": "Person",
			"name": "John Doe",
			"jobTitle": "Graduate research assistant",
			"affiliation": "University of Dreams",
			"additionalName": "Jhonny",
			"url": "${url}",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "1234 Peach Drive",
				"addressLocality": "Wonderland",
				"addressRegion": "Georgia"
			}
		}
	`
}

module.exports = {
	getSchemaJSON,
}