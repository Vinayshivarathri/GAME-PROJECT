const CACHE_NAME = "myapp-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/Images/", // You might want to cache specific images inside /Images/
];

// Install event: caching app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Forces service worker to activate immediately
      .catch(err => console.error("Failed to cache assets:", err))
  );
});

// Activate event: clearing old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim()) // Take control of uncontrolled clients
  );
});

// Fetch event: respond with cache first, then network fallback
self.addEventListener("fetch", event => {
  // Only handle GET requests (optional but recommended)
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached asset
        }
        return fetch(event.request) // Fetch from network if not in cache
          .then(networkResponse => {
            // Optional: cache new requests dynamically
            return caches.open(CACHE_NAME).then(cache => {
              // Only cache successful responses
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          })
          .catch(() => {
            // Optional: fallback page if offline and resource not cached
            if (event.request.destination === "document") {
              return caches.match("/index.html");
            }
          });
      })
  );
});
