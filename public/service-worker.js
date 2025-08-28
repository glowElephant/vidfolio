self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/video/')) {
    event.respondWith(
      caches.open('videos').then(cache =>
        cache.match(event.request).then(resp => {
          if (resp) return resp;
          return fetch(event.request).then(networkResp => {
            cache.put(event.request, networkResp.clone());
            return networkResp;
          });
        })
      )
    );
  }
});
