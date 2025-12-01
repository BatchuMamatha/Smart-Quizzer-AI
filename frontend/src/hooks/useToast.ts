import { useState, useEffect } from 'react';
import { toastManager } from '../lib/toast';
import { ToastMessage } from '../components/Toast';

/**
 * useToast Hook
 * 
 * React hook to manage toast notifications in components
 * Automatically subscribes/unsubscribes to toast manager
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // Subscribe to toast updates
    const unsubscribe = toastManager.subscribe(setToasts);

    // Get initial toasts
    setToasts(toastManager.getToasts());

    // Cleanup on unmount
    return unsubscribe;
  }, []);

  const removeToast = (id: string) => {
    toastManager.removeToast(id);
  };

  return {
    toasts,
    removeToast
  };
}
