import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      return true; // Allow access to the route
    } else {
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
      return false; // Prevent access to the route
    }
  }
}
