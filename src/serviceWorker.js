window.self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('weather-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.css',
        '/App.js',
        '/images/cloudy.png',
        '/images/rainy.png',
        '/images/sunny.png',
      ]);
    })
  );
});

window.self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});