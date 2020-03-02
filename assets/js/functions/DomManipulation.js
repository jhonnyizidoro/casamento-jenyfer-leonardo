const isElement = element => element instanceof Element || element instanceof HTMLDocument || window.self === element
const isNodeList = nodeList => nodeList instanceof NodeList && nodeList.length > 0
const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
const isArray = array => array instanceof Array && array.length > 0

export {
	isElement,
	isNodeList,
	isMobile,
	isArray,
}