const CACHE_NAME = 'webapp_pwa_cache'
const CACHING_DURATION = 15 * 60

self.addEventListener('fetch', event => {
	const {request} = event
	event.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache.match(request).then(response => {
				if (response) {
					const expirationDate = Date.parse(response.headers.get('sw-cache-expires'))
					const now = new Date()
					if (expirationDate > now) {
						return response
					}
				}
				return fetch(request.url).then(liveResponse => {
					const expires = new Date()
					expires.setSeconds(expires.getSeconds() + CACHING_DURATION)
					const cachedResponseFields = {
						status: liveResponse.status,
						statusText: liveResponse.statusText,
						headers: {
							'sw-cache-expires': expires.toUTCString()
						},
					}
					liveResponse.headers.forEach((header, headerName) => {
						cachedResponseFields.headers[headerName] = header
					})
					const returnedResponse = liveResponse.clone()
					return liveResponse.blob().then(body => {
						cache.put(request, new Response(body, cachedResponseFields))
						return returnedResponse
					})
				})
			})
		})
	)
})