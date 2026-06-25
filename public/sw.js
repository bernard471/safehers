// SafeHer Foundation — Service Worker stub
// Prevents 404 errors in browsers that check for sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
