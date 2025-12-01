/**
 * Offline Indicator Component
 * Shows online/offline status with visual feedback
 */

import React from 'react';
import { useOnlineStatus } from '../lib/serviceWorkerManager';

interface OfflineIndicatorProps {
  showWhenOnline?: boolean;
  position?: 'top' | 'bottom';
}

/**
 * OfflineIndicator - Shows connection status
 * 
 * @example
 * <OfflineIndicator />
 */
export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  showWhenOnline = false,
  position = 'top'
}) => {
  const isOnline = useOnlineStatus();
  const [wasOffline, setWasOffline] = React.useState(false);
  const [showOnlineBanner, setShowOnlineBanner] = React.useState(false);

  React.useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      // Just came back online
      setShowOnlineBanner(true);
      setTimeout(() => {
        setShowOnlineBanner(false);
        setWasOffline(false);
      }, 5000);
    }
  }, [isOnline, wasOffline]);

  // Show offline banner
  if (!isOnline) {
    return (
      <div
        className={`
          fixed left-0 right-0 z-50
          bg-yellow-500 text-white
          px-4 py-3
          shadow-lg
          animate-slide-down
          ${position === 'top' ? 'top-0' : 'bottom-0'}
        `}
        role="alert"
      >
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="text-xl">📡</span>
          <div className="flex-1 text-center">
            <span className="font-semibold">You're Offline</span>
            <span className="hidden sm:inline"> - Some features may be limited</span>
          </div>
          <span className="text-xl animate-pulse">⚠️</span>
        </div>
      </div>
    );
  }

  // Show back online banner (temporary)
  if (showOnlineBanner && showWhenOnline) {
    return (
      <div
        className={`
          fixed left-0 right-0 z-50
          bg-green-500 text-white
          px-4 py-3
          shadow-lg
          animate-slide-down
          ${position === 'top' ? 'top-0' : 'bottom-0'}
        `}
        role="alert"
      >
        <div className="container mx-auto flex items-center justify-center gap-3">
          <span className="text-xl">✅</span>
          <div className="flex-1 text-center">
            <span className="font-semibold">Back Online</span>
            <span className="hidden sm:inline"> - All features restored</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

/**
 * Connection Status Badge - Small inline indicator
 */
export const ConnectionBadge: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
        ${isOnline 
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
        }
      `}
      title={isOnline ? 'Online' : 'Offline'}
    >
      <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
};

export default OfflineIndicator;
