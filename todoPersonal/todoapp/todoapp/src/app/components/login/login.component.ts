import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgIf,CommonModule,HttpClientModule]
})
export class LoginComponent 
{
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() 
  {
    // Check if both username and password are filled
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter both username and password';
      return; // Stop the login process
    }

    // Attempt login with the provided credentials
    if (!this.authService.login(this.username, this.password)) {
      this.errorMessage = 'Invalid username or password';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
