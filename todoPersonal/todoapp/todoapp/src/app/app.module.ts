// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [AuthService,LoginComponent],
  bootstrap: []
})
export class AppModule { }