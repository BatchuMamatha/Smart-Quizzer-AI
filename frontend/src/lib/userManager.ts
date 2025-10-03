import { User } from './api';

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
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (userData && token) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  public login(user: User, token: string): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', token);
  }

  public logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null && localStorage.getItem('access_token') !== null;
  }

  public updateUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}