const CACHE_NAME = 'dcsprep-v2';

const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon.svg',
  '/skill-coach',
  '/modules',
  '/focus',
  '/due-today',
  '/strict-quiz',
  '/pd-log',
  '/academic-pd',
  '/readiness',
  '/scenarios',
  '/simulations/network',
  '/simulations/roleplay'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(CORE_ASSETS.map((asset) => new Request(asset, { cache: 'reload' })))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cacheName) => (cacheName === CACHE_NAME ? undefined : caches.delete(cacheName))))
      )
  );
  self.clients.claim();
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  // Special handling for module pages to support offline access for downloaded modules
  if (request.url.includes('/modules/') && !request.url.includes('/api/')) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
        return response;
      }
    } catch (error) {
      // Offline: If it's a module page, we try to return the cached shell
      // The client-side component (ModulePage) will then try to load data from IndexedDB
      const cached = await cache.match(request);
      if (cached) return cached;
      
      // Fallback to the generic module list page or the base module shell
      const moduleList = await cache.match('/modules');
      if (moduleList) return moduleList;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return cache.match('/');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
