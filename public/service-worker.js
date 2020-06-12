
self.addEventListener('install', event => {
  event.waitUntil(caches.open('list-cache-v1')
    .then(cache => cache.addAll([
      '/',
      '/db.js',
      '/app.js',
      '/manifest.json'
    ])))
})

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request)
    .catch(err => {
      return caches.match(event.request)
        .then(match => {
          if (match) {
            return match
          } else if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/')
          }
        })
    }))
})