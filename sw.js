/* Followed tutorial from Matthew Cranford: 
https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/ 
*/

// Cache Files

var cacheName = 'mws-restaurant-001';
const cachedFiles = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    ];

// Listen for installation event and cache files

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('cacheName').then(function(cache) {
			console.log('Opened Cache');
			console.log(cachedFiles);
			return cache.addAll(cachedFiles);
		})
	);
});

// Listen for fetch request, see if file is in cache, and return or fetch files

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				console.log('Found ', event.request, ' in cache');
				return response;
			} else {
				console.log('Could not find ', event.request, ' in cache, fetching.');
				return fetch(event.request)
				.then(function(response) {
					const clonedResponse = response.clone();
					caches.open('cacheName').then(function(cache) {
						cache.put(event.request, clonedResponse);
					})
					return response;
				})
				.catch(function(err) {
					console.error(err);
				});
			}
		})
	);
});