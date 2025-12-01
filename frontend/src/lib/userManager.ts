import { User } from './api';
import { sessionTimeout } from './sessionTimeout';

export class UserManager {
  private static instance: UserManager;
  private currentUser: User | null = null;

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('access_token');
    
    if (userData && token) {
      try {
        this.currentUser = JSON.parse(userData);
        // Resume session timeout monitoring if user was already logged in
        sessionTimeout.start();
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  public login(user: User, token: string): void {
    // First, clear any existing data
    this.logout();
    
    // Then store new data
    this.currentUser = user;
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('access_token', token);
    
    console.log('🔍 UserManager.login:', {
      userId: user.id,
      username: user.username,
      fullName: user.full_name,
      tokenStored: !!token
    });
    
    // Start session timeout monitoring (30-min inactivity)
    sessionTimeout.start();
  }

  public logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    
    // Also clear localStorage in case there's old data
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    
    // Stop session timeout monitoring
    sessionTimeout.stop();
    
    console.log('🔍 UserManager.logout: All session data cleared');
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null && sessionStorage.getItem('access_token') !== null;
  }

  public updateUser(user: User): void {
    this.currentUser = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  public isAdmin(): boolean {
    return this.currentUser !== null && this.currentUser.role === 'admin';
  }
}