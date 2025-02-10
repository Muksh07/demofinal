import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private readonly API_URL = 'http://localhost:5016/api/User';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  

  register(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URL}/CreateAccount`, {
        userName: username,
        password: password
      }).subscribe({
        next: (response: any) => {
          if (response > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error) => {
          resolve(false);
        }
      });
    });
  }

  


  login(username: string, password: string): Promise<Object | null> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URL}/AccountLogin`, {
        userName: username,
        password: password
      }).subscribe({
        next: (response: any) => {
          if (response !== 0) {
            const user = { username, id: response };
            localStorage.setItem('user', JSON.stringify(user));
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(['/todo']);
            resolve(user); // Resolve with the user object
          } else {
            resolve(null); // Resolve with null if user does not exist
          }
        },
        error: (error) => {
          reject(null); // Reject with null on error
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getCurrentUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return 0;
  }
}
