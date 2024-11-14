// service-worker.js
const CACHE_NAME = "recette-mobile v123";
const urlsToCache = [
    "/",
    "/index.html",
    "/index.js",
    "/crud.html",
    "/crud.js",
    "/viewRecipe.html",
    "/viewRecipe.js",
    "/styles.css",
    "/header.js",
    "/footer.js",
    "/header.html",
    "/footer.html",
    "/script.js",
    "/G.png",
    "/G.png"
];

// Installation du service worker et mise en cache initiale
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Cache ouvert");
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation et nettoyage des anciens caches si nécessaire
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Cache ancien supprimé :", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepter les requêtes réseau et répondre depuis le cache si possible
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
