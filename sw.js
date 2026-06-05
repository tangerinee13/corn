// Service worker - caches app for offline use
const CACHE = 'corn-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Bowlby+One&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Don't try to cache YouTube — let it fail offline (handled in the app)
  if (e.request.url.includes('youtube.com') || e.request.url.includes('ytimg.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(resp => {
        // Cache successful GETs for next time
        if (e.request.method === 'GET' && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
