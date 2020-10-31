importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
    console.log(`Yay! workbox berhasil 🎉`);
} else {
    console.log(`Boo! Workbox gagal 😬`);
}

workbox.precaching.precacheAndRoute([{
    url: '/index.html',
    revision: '1'
}, {
    url: '/nav.html',
    revision: '1'
}, {
    url: '/detail.html',
    revision: '1'
}, {
    url: '/workbox-sw.js',
    revision: '1'
}, {
    url: '/manifest.json',
    revision: '1'
}, {
    url: '/pages/home.html',
    revision: '1'
}, {
    url: 'sw-check.js',
    revision: '1'
}, {
    url: '/pages/saved.html',
    revision: '1'
}], {
    // supaya pas mode offline halaman detail ga error
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/asset/css/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'css'
    })
);

workbox.routing.registerRoute(
    new RegExp('/asset/icons/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'icons'
    })
);

workbox.routing.registerRoute(
    new RegExp('/asset/img/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'gambar'
    })
);

workbox.routing.registerRoute(
    new RegExp('/asset/js/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'js'
    })
);


workbox.routing.registerRoute(
    'https://api.football-data.org/v2/teams',
    new workbox.strategies.StaleWhileRevalidate(),
);

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