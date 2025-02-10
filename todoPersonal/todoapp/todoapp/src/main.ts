import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/components/app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { TodoComponent } from './app/components/todo/todo.component';
import { RegisterComponent } from './app/components/register/register.component';
import { AuthGuard } from './app/guards/auth.guard'; // Import the AuthGuard
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] }, // Protect /todo with AuthGuard
      { path: 'register', component: RegisterComponent }
    ]),
    provideAnimations(), provideHttpClient()
  ]
}).catch(err => console.error(err));
