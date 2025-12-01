/**
 * Service Worker for Offline Support
 * Caches assets and enables offline quiz taking
 */

const CACHE_NAME = 'smart-quizzer-v1';
const RUNTIME_CACHE = 'smart-quizzer-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
      })
      .then(() => {
        console.log('[Service Worker] Installed successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map(cacheName => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions and dev server
  if (url.protocol === 'chrome-extension:' || url.hostname === 'localhost') {
    return;
  }

  // API requests - Network First strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Static assets - Cache First strategy
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages - Network First with cache fallback
  event.respondWith(networkFirst(request));
});

/**
 * Cache First Strategy
 * Try cache first, fallback to network
 */
async function cacheFirst(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[Service Worker] Serving from cache:', request.url);
      return cached;
    }

    console.log('[Service Worker] Fetching from network:', request.url);
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[Service Worker] Cache first failed:', error);
    return new Response('Offline - Asset not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Network First Strategy
 * Try network first, fallback to cache
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, trying cache:', request.url);
    
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[Service Worker] Serving from cache:', request.url);
      return cached;
    }

    // Return offline page for HTML requests
    if (request.headers.get('accept').includes('text/html')) {
      return new Response(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Offline - Smart Quizzer AI</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
                padding: 20px;
              }
              .container {
                max-width: 500px;
              }
              .icon {
                font-size: 80px;
                margin-bottom: 20px;
              }
              h1 {
                font-size: 32px;
                margin-bottom: 10px;
              }
              p {
                font-size: 18px;
                opacity: 0.9;
                line-height: 1.6;
              }
              button {
                margin-top: 30px;
                padding: 12px 30px;
                font-size: 16px;
                background: white;
                color: #667eea;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s;
              }
              button:hover {
                transform: scale(1.05);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">📡</div>
              <h1>You're Offline</h1>
              <p>
                Smart Quizzer AI requires an internet connection for some features.
                Don't worry - your progress is saved locally!
              </p>
              <p style="font-size: 14px; opacity: 0.7; margin-top: 20px;">
                Once you're back online, you can continue taking quizzes and sync your results.
              </p>
              <button onclick="window.location.reload()">
                🔄 Try Again
              </button>
            </div>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Background sync for quiz submissions
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-quiz-results') {
    event.waitUntil(syncQuizResults());
  }
});

/**
 * Sync quiz results when back online
 */
async function syncQuizResults() {
  try {
    // Get pending quiz results from IndexedDB
    const pendingResults = await getPendingQuizResults();
    
    for (const result of pendingResults) {
      try {
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result)
        });
        
        if (response.ok) {
          await removePendingQuizResult(result.id);
          console.log('[Service Worker] Synced quiz result:', result.id);
        }
      } catch (error) {
        console.error('[Service Worker] Failed to sync result:', error);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

/**
 * Get pending quiz results (placeholder - implement with IndexedDB)
 */
async function getPendingQuizResults() {
  // TODO: Implement IndexedDB storage
  return [];
}

/**
 * Remove synced quiz result (placeholder - implement with IndexedDB)
 */
async function removePendingQuizResult(id) {
  // TODO: Implement IndexedDB removal
}

// Push notifications (future feature)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Smart Quizzer AI', {
        body: data.body || 'You have a new notification',
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        data: data
      })
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

console.log('[Service Worker] Loaded successfully');
