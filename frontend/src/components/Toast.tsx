import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

/**
 * Individual Toast Component
 * 
 * Displays a single toast notification with auto-dismiss and manual close
 */
const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const duration = toast.duration || 5000;

  useEffect(() => {
    // Progress bar animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 50);

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-700',
          icon: 'bg-green-500 text-white',
          progress: 'bg-green-500',
          text: 'text-green-800 dark:text-green-200',
          subtext: 'text-green-600 dark:text-green-300'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-700',
          icon: 'bg-red-500 text-white',
          progress: 'bg-red-500',
          text: 'text-red-800 dark:text-red-200',
          subtext: 'text-red-600 dark:text-red-300'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-700',
          icon: 'bg-yellow-500 text-white',
          progress: 'bg-yellow-500',
          text: 'text-yellow-800 dark:text-yellow-200',
          subtext: 'text-yellow-600 dark:text-yellow-300'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-700',
          icon: 'bg-blue-500 text-white',
          progress: 'bg-blue-500',
          text: 'text-blue-800 dark:text-blue-200',
          subtext: 'text-blue-600 dark:text-blue-300'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border shadow-lg
        ${colors.bg} ${colors.border}
        ${isExiting ? 'animate-toast-exit' : 'animate-toast-enter'}
        max-w-sm w-full
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full ${colors.progress} transition-all ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start">
          {/* Icon */}
          <div className={`flex-shrink-0 w-8 h-8 ${colors.icon} rounded-full flex items-center justify-center font-bold`}>
            {getIcon()}
          </div>

          {/* Content */}
          <div className="ml-3 flex-1">
            <p className={`text-sm font-semibold ${colors.text}`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className={`mt-1 text-sm ${colors.subtext}`}>
                {toast.message}
              </p>
            )}
            {toast.action && (
              <button
                onClick={toast.action.onClick}
                className={`mt-2 text-sm font-medium ${colors.text} underline hover:no-underline`}
              >
                {toast.action.label}
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className={`ml-3 flex-shrink-0 ${colors.text} hover:opacity-70 transition-opacity`}
            aria-label="Close notification"
          >
            <span className="text-xl">×</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
