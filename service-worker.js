const CACHE_NAME = "football-app-v31";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/detail.html",
    "/manifest.json",
    "/sw-check.js",
    "/asset/js/api.js",
    "/asset/js/db.js",
    "/asset/js/idb.js",
    "/asset/js/nav.js",
    "/asset/js/detail-team.js",
    "/asset/js/materialize.min.js",
    "/asset/js/components/card-detail.js",
    "/asset/js/components/card-item.js",
    "/asset/css/materialize.min.css",
    "/asset/css/card-team.css",
    "/asset/img/bg1.webp",
    "/asset/img/bg2.webp",
    "/asset/img/bg3.webp",
    "/asset/img/bg4.webp",
    "/asset/img/bg5.webp",
    "/asset/img/bg6.webp",
    "/asset/img/bg7.webp",
    "/asset/img/bg8.webp",
    "/asset/img/bg9.webp",
    "/asset/img/bg10.webp",
    "/asset/img/bg11.webp",
    "/asset/icons/aple-192x192.png",
    "/asset/icons/icon-128x128.png",
    "/asset/icons/icon-144x144.png",
    "/asset/icons/icon-152x152.png",
    "/asset/icons/icon-192x192.png",
    "/asset/icons/icon-384x384.png",
    "/asset/icons/icon-512x512.png",
    // "http://api.football-data.org/v2/teams"
];

self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    const base_url = "http://api.football-data.org/v2/teams";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) =>
                fetch(event.request).then((response) => {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            )
        );
    } else {
        event.respondWith(
            caches
            .match(event.request, {
                ignoreSearch: true,
                mode: "no-cors",
                headers: {
                    "X-Auth-Token": "4d8cdc4b83c94ba19969ac6990d91775",
                },
            })
            .then((response) => response || fetch(event.request))
        );
    }
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

self.addEventListener("push", (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = "message no payload";
    }

    const options = {
        body,
        icons: "icon.webp",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };
    event.waitUntil(
        self.registration.showNotification("Push Notification", options)
    );
});