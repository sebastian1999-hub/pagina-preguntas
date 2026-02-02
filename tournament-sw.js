// Service Worker para PWA de Torneos
const CACHE_NAME = 'torneos-v1';
const urlsToCache = [
  '/tournament.html',
  '/styles.css',
  '/tournament.css',
  '/tournament.js',
  'https://fonts.googleapis.com/css2?family=Rancho&display=swap'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Error al cachear:', err);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de caché: Cache First, falling back to Network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devuelve la respuesta cacheada
        if (response) {
          return response;
        }
        
        // Si no está en caché, hacer fetch a la red
        return fetch(event.request)
          .then(response => {
            // Verificar si la respuesta es válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta
            const responseToCache = response.clone();
            
            // Agregar al caché
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Si falla la red, devolver página offline personalizada
            return new Response(
              '<h1>Sin conexión</h1><p>La aplicación funciona offline con los torneos guardados localmente.</p>',
              { headers: { 'Content-Type': 'text/html' } }
            );
          });
      })
  );
});
