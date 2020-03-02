const toInteger = number => parseInt(String(Number(String(number).replace(/[^\d-.,]/g, '')).toFixed(0)), 10)
const toNatural = number => parseInt(String(Number(String(number).replace(/[^\d.,]/g, '')).toFixed(0)), 10)

const formatMoney = (value, config = {}) => {
	//BUSCANDO CONFIGURAÇÕES DE CONFIG
	const space = config.space || ''
	const decimals = config.decimals || 0
	//FORMATANDO O VALOR
	const intValue = toInteger(value)
	const formattedValue = intValue.toLocaleString('pt-BR').replace(',', '.')
	if (decimals > 0) {
		return `R$${space + formattedValue},${'0'.repeat(decimals)}`
	}
	return `R$${space + formattedValue}`
}

export {
	toInteger,
	toNatural,
	formatMoney
}