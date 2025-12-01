import { ToastMessage, ToastType } from '../components/Toast';

type ToastListener = (toasts: ToastMessage[]) => void;

/**
 * Toast Manager
 * 
 * Singleton service for managing toast notifications across the application
 * Provides methods to show success, error, warning, and info toasts
 */
class ToastManager {
  private static instance: ToastManager;
  private toasts: ToastMessage[] = [];
  private listeners: ToastListener[] = [];
  private toastIdCounter = 0;

  private constructor() {}

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  /**
   * Subscribe to toast updates
   */
  public subscribe(listener: ToastListener): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of toast changes
   */
  private notify(): void {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  /**
   * Add a new toast
   */
  private addToast(toast: Omit<ToastMessage, 'id'>): string {
    const id = `toast-${++this.toastIdCounter}`;
    const newToast: ToastMessage = { id, ...toast };
    this.toasts.push(newToast);
    this.notify();
    return id;
  }

  /**
   * Remove a toast by ID
   */
  public removeToast(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  /**
   * Clear all toasts
   */
  public clearAll(): void {
    this.toasts = [];
    this.notify();
  }

  /**
   * Show a success toast
   */
  public success(title: string, message?: string, options?: {
    duration?: number;
    action?: { label: string; onClick: () => void };
  }): string {
    return this.addToast({
      type: 'success',
      title,
      message,
      duration: options?.duration || 5000,
      action: options?.action
    });
  }

  /**
   * Show an error toast
   */
  public error(title: string, message?: string, options?: {
    duration?: number;
    action?: { label: string; onClick: () => void };
  }): string {
    return this.addToast({
      type: 'error',
      title,
      message,
      duration: options?.duration || 7000, // Errors stay longer
      action: options?.action
    });
  }

  /**
   * Show a warning toast
   */
  public warning(title: string, message?: string, options?: {
    duration?: number;
    action?: { label: string; onClick: () => void };
  }): string {
    return this.addToast({
      type: 'warning',
      title,
      message,
      duration: options?.duration || 5000,
      action: options?.action
    });
  }

  /**
   * Show an info toast
   */
  public info(title: string, message?: string, options?: {
    duration?: number;
    action?: { label: string; onClick: () => void };
  }): string {
    return this.addToast({
      type: 'info',
      title,
      message,
      duration: options?.duration || 5000,
      action: options?.action
    });
  }

  /**
   * Show a custom toast
   */
  public custom(toast: Omit<ToastMessage, 'id'>): string {
    return this.addToast(toast);
  }

  /**
   * Get current toasts
   */
  public getToasts(): ToastMessage[] {
    return [...this.toasts];
  }
}

// Export singleton instance
export const toastManager = ToastManager.getInstance();

// Export convenience functions
export const toast = {
  success: (title: string, message?: string, options?: any) => 
    toastManager.success(title, message, options),
  
  error: (title: string, message?: string, options?: any) => 
    toastManager.error(title, message, options),
  
  warning: (title: string, message?: string, options?: any) => 
    toastManager.warning(title, message, options),
  
  info: (title: string, message?: string, options?: any) => 
    toastManager.info(title, message, options),
  
  custom: (toast: Omit<ToastMessage, 'id'>) => 
    toastManager.custom(toast)
};
