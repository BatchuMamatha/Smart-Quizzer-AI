/**
 * Error Notification Component
 * Unified error display across the application
 */

import React, { useState, useEffect } from 'react';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

interface ErrorNotificationProps {
  message: string;
  type?: ErrorType;
  dismissible?: boolean;
  autoHide?: boolean;
  autoHideDelay?: number;
  onDismiss?: () => void;
  className?: string;
}

const typeStyles: Record<ErrorType, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-400 dark:border-red-700',
    text: 'text-red-800 dark:text-red-300',
    icon: '❌'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-400 dark:border-yellow-700',
    text: 'text-yellow-800 dark:text-yellow-300',
    icon: '⚠️'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-400 dark:border-blue-700',
    text: 'text-blue-800 dark:text-blue-300',
    icon: 'ℹ️'
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-400 dark:border-green-700',
    text: 'text-green-800 dark:text-green-300',
    icon: '✅'
  }
};

/**
 * ErrorNotification - Standardized error/message display
 * 
 * @example
 * // Simple error message
 * {error && <ErrorNotification message={error} />}
 * 
 * @example
 * // Success message with auto-hide
 * <ErrorNotification 
 *   message="Profile updated successfully!" 
 *   type="success" 
 *   autoHide 
 *   onDismiss={() => setSuccess('')}
 * />
 */
export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  type = 'error',
  dismissible = true,
  autoHide = false,
  autoHideDelay = 5000,
  onDismiss,
  className = ''
}) => {
  const [visible, setVisible] = useState(true);
  const styles = typeStyles[type];

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  if (!visible || !message) {
    return null;
  }

  return (
    <div
      className={`
        rounded-lg border p-4 mb-4
        ${styles.bg}
        ${styles.border}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start">
        <span className="text-xl mr-3 flex-shrink-0">{styles.icon}</span>
        <div className="flex-1">
          <p className={`text-sm ${styles.text}`}>{message}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`
              ml-3 flex-shrink-0
              ${styles.text}
              hover:opacity-70
              transition-opacity
            `}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Inline error message (compact version for form fields)
 */
interface InlineErrorProps {
  message: string;
  className?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <p className={`text-sm text-red-600 dark:text-red-400 mt-1 ${className}`}>
      {message}
    </p>
  );
};

/**
 * Error alert (for critical errors requiring user acknowledgment)
 */
export const showErrorAlert = (message: string, title?: string) => {
  const fullMessage = title ? `${title}\n\n${message}` : message;
  alert(fullMessage);
};

/**
 * Success alert (for confirming important actions)
 */
export const showSuccessAlert = (message: string, title?: string) => {
  const fullMessage = title ? `✅ ${title}\n\n${message}` : `✅ ${message}`;
  alert(fullMessage);
};

/**
 * Warning alert (for important warnings)
 */
export const showWarningAlert = (message: string, title?: string) => {
  const fullMessage = title ? `⚠️ ${title}\n\n${message}` : `⚠️ ${message}`;
  alert(fullMessage);
};
