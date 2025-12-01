/**
 * Service Worker Registration Utility
 */
import React from 'react';

export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  public static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  /**
   * Register service worker
   */
  public async register(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Workers not supported');
      return;
    }

    try {
      console.log('🔧 Registering Service Worker...');
      
      this.registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('✅ Service Worker registered successfully:', this.registration.scope);

      // Check for updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration?.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🆕 New Service Worker available - refresh to update');
              this.showUpdateNotification();
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('📩 Message from Service Worker:', event.data);
      });

    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  }

  /**
   * Unregister service worker
   */
  public async unregister(): Promise<void> {
    if (this.registration) {
      const success = await this.registration.unregister();
      if (success) {
        console.log('Service Worker unregistered');
        this.registration = null;
      }
    }
  }

  /**
   * Check if online
   */
  public isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Request background sync
   */
  public async requestSync(tag: string): Promise<void> {
    if (!this.registration || !('sync' in this.registration)) {
      console.log('Background Sync not supported');
      return;
    }

    try {
      // Type assertion for sync property which is not in default TypeScript types
      const syncManager = (this.registration as any).sync;
      await syncManager.register(tag);
      console.log(`Background sync registered: ${tag}`);
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }

  /**
   * Show update notification
   */
  private showUpdateNotification(): void {
    // Create a banner to notify user of update
    const banner = document.createElement('div');
    banner.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl z-50 max-w-sm';
    banner.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">🔄</span>
        <div class="flex-1">
          <h4 class="font-semibold mb-1">Update Available</h4>
          <p class="text-sm text-blue-100 mb-3">A new version of Smart Quizzer AI is available.</p>
          <button
            onclick="window.location.reload()"
            class="bg-white text-blue-600 px-4 py-2 rounded font-medium text-sm hover:bg-blue-50 transition-colors"
          >
            Update Now
          </button>
        </div>
        <button
          onclick="this.closest('div').remove()"
          class="text-blue-200 hover:text-white ml-2"
        >
          ✕
        </button>
      </div>
    `;
    
    document.body.appendChild(banner);

    // Auto-remove after 30 seconds
    setTimeout(() => {
      if (banner.parentNode) {
        banner.remove();
      }
    }, 30000);
  }

  /**
   * Get registration status
   */
  public getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  /**
   * Clear all caches
   */
  public async clearCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }
}

/**
 * Hook for online/offline detection
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online');
      setIsOnline(true);
    };

    const handleOffline = () => {
      console.log('📡 Gone offline');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Export singleton instance
export const serviceWorkerManager = ServiceWorkerManager.getInstance();
