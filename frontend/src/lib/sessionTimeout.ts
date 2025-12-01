/**
 * Session Timeout Manager
 * Implements automatic logout after 30 minutes of inactivity
 * Tracks user activity (mouse, keyboard, touch) and warns before logout
 */

import { UserManager } from './userManager';

export class SessionTimeout {
  private static instance: SessionTimeout;
  private timeoutId: NodeJS.Timeout | null = null;
  private warningId: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();
  private isActive: boolean = false;
  
  // Configuration
  private readonly TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private readonly WARNING_DURATION = 2 * 60 * 1000;  // Warn 2 minutes before timeout
  private readonly STORAGE_KEY = 'last_activity';
  
  // Activity event listeners
  private activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  
  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): SessionTimeout {
    if (!SessionTimeout.instance) {
      SessionTimeout.instance = new SessionTimeout();
    }
    return SessionTimeout.instance;
  }

  /**
   * Start monitoring user activity
   */
  public start(): void {
    if (this.isActive) {
      return; // Already started
    }

    console.log('🕐 Session timeout monitoring started (30 min inactivity limit)');
    this.isActive = true;
    this.lastActivity = Date.now();
    localStorage.setItem(this.STORAGE_KEY, this.lastActivity.toString());
    
    // Register activity listeners
    this.activityEvents.forEach(event => {
      document.addEventListener(event, this.handleActivity, true);
    });
    
    // Start timeout timers
    this.resetTimers();
    
    // Check for activity in other tabs
    window.addEventListener('storage', this.handleStorageChange);
  }

  /**
   * Stop monitoring (called on logout)
   */
  public stop(): void {
    if (!this.isActive) {
      return;
    }

    console.log('🕐 Session timeout monitoring stopped');
    this.isActive = false;
    
    // Remove activity listeners
    this.activityEvents.forEach(event => {
      document.removeEventListener(event, this.handleActivity, true);
    });
    
    // Clear timers
    this.clearTimers();
    
    // Remove storage listener
    window.removeEventListener('storage', this.handleStorageChange);
    
    // Clear storage
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Handle user activity
   */
  private handleActivity = (): void => {
    if (!this.isActive) {
      return;
    }

    this.lastActivity = Date.now();
    localStorage.setItem(this.STORAGE_KEY, this.lastActivity.toString());
    this.resetTimers();
  };

  /**
   * Handle activity from other tabs
   */
  private handleStorageChange = (e: StorageEvent): void => {
    if (e.key === this.STORAGE_KEY && e.newValue) {
      const otherTabActivity = parseInt(e.newValue, 10);
      if (otherTabActivity > this.lastActivity) {
        this.lastActivity = otherTabActivity;
        this.resetTimers();
      }
    }
  };

  /**
   * Reset timeout and warning timers
   */
  private resetTimers(): void {
    this.clearTimers();
    
    // Set warning timer (28 minutes - warns 2 min before timeout)
    this.warningId = setTimeout(() => {
      this.showWarning();
    }, this.TIMEOUT_DURATION - this.WARNING_DURATION);
    
    // Set logout timer (30 minutes)
    this.timeoutId = setTimeout(() => {
      this.handleTimeout();
    }, this.TIMEOUT_DURATION);
  }

  /**
   * Clear all timers
   */
  private clearTimers(): void {
    if (this.warningId) {
      clearTimeout(this.warningId);
      this.warningId = null;
    }
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Show warning before auto-logout
   */
  private showWarning(): void {
    if (!this.isActive) {
      return;
    }

    // Show a native browser alert (works even if page is in background)
    const continueSession = window.confirm(
      '⚠️ Session Timeout Warning\n\n' +
      'You will be automatically logged out in 2 minutes due to inactivity.\n\n' +
      'Click OK to continue your session, or Cancel to logout now.'
    );

    if (continueSession) {
      // User clicked OK - reset activity
      this.handleActivity();
    } else {
      // User clicked Cancel - logout immediately
      this.handleTimeout();
    }
  }

  /**
   * Handle session timeout - logout user
   */
  private handleTimeout(): void {
    if (!this.isActive) {
      return;
    }

    console.log('⏰ Session timeout - logging out due to inactivity');
    
    // Stop monitoring
    this.stop();
    
    // Logout user
    const userManager = UserManager.getInstance();
    userManager.logout();
    
    // Show message and redirect
    alert(
      '🔒 Session Expired\n\n' +
      'You have been logged out due to 30 minutes of inactivity.\n' +
      'Please log in again to continue.'
    );
    
    // Redirect to login
    window.location.href = '/login';
  }

  /**
   * Get time remaining until timeout (for debugging)
   */
  public getTimeRemaining(): number {
    if (!this.isActive) {
      return 0;
    }
    
    const elapsed = Date.now() - this.lastActivity;
    const remaining = this.TIMEOUT_DURATION - elapsed;
    return Math.max(0, remaining);
  }

  /**
   * Get formatted time remaining
   */
  public getTimeRemainingFormatted(): string {
    const ms = this.getTimeRemaining();
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Check if session is active
   */
  public isMonitoring(): boolean {
    return this.isActive;
  }
}

// Export singleton instance
export const sessionTimeout = SessionTimeout.getInstance();
