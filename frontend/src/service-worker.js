// Cache versioning
const CACHE_NAME = "static-cache-v2";

// Files to cache
const STATIC_ASSETS = [
  "/", // Root HTML file
  "/index.html", // Main HTML file
  "/index.css", // Tailwind CSS global styles
  "/icon-192x192.png", // App icons
  "/icon-512x512.png",
  "/apple-touch-icon.png", // iOS-specific icon
  "/offline.html", // Offline fallback page
];

// Install event: Cache essential assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
});

// Fetch event: Serve from cache or fetch from network
self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching", event.request.url);

  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Serve offline fallback for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push received");

  const options = {
    body: event.data ? event.data.text() : "Default Push Notification",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

// Background Sync event
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Sync event triggered", event.tag);

  if (event.tag === "sync-data") {
    event.waitUntil(
      fetch("/sync-endpoint", { method: "POST" })
        .then(() => console.log("Data synced successfully"))
        .catch((err) => console.error("Sync failed", err))
    );
  }
});
