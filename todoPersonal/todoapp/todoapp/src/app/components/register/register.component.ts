import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, NgIf]
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(public authService: AuthService, public router: Router) {}

  async register() 
  {
    // Check for empty fields
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = "All fields are required!";
      this.successMessage = '';
      return;
    }
   
    // Check password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords don't match!";
      this.successMessage = '';
      return;
    }
   
    // Trim whitespace and attempt registration
    const cleanUsername = this.username.trim();
    const cleanPassword = this.password.trim();
    
    if (!cleanUsername || !cleanPassword) {
      this.errorMessage = "Username and password cannot be empty!";
      this.successMessage = '';
      return;
    }
   
    // console.log(this.authService.register(cleanUsername, cleanPassword));
    if (await this.authService.register(cleanUsername, cleanPassword)) 
    {
      this.successMessage = 'Registration successful! Redirecting to login...';
      this.errorMessage = '';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } 
    else {
      this.errorMessage = 'Username already exists!';
      this.successMessage = '';
    }
  }
   
}
