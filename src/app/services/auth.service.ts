import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { AuthModel } from '../models/Auth';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dataUser: User | undefined;
  $isLogged = signal<boolean>(this.isLoggedIn());

  private URL_API: string = environment.baseUrlApu;
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  authLogin(data: AuthModel): Observable<any> {
    return this.httpClient.post(this.URL_API + '/auth/login', data)
  }

  authRegister(data: AuthModel): Observable<any> {
    return this.httpClient.post(this.URL_API + '/auth/register', data)
  }
  
  authLoginWithGoogle(email: string): Observable<any> {
    return this.httpClient.post(this.URL_API + '/auth/loginWithGoogle', {email})
  }

  authRegisterWithGoogle(user: AuthModel): Observable<any> {
    return this.httpClient.post(this.URL_API + '/auth/registerWithGoogle', user)
  }


  getUser() {
    const userData = localStorage.getItem('user');
    this.dataUser = userData ? JSON.parse(userData) : null;
    return this.dataUser;
  }

  logIn(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.dataUser = user;
    this.getUser();
    this.$isLogged.set(true);
    this.router.navigate([`dashboard/home`])
  }

  updateDataUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.dataUser = user;
    this.getUser();
  }


  logOut(): void {
    this.dataUser = undefined;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.$isLogged.set(false);
    this.router.navigate([``])
  }

  isLoggedIn(): boolean {
    const token: any = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }

    if (token) {
      const tokenExpires = new Date(token.split('.')[1] * 1000);
      const now = new Date();

      if (now >= tokenExpires) {
        localStorage.removeItem('token');
        return false;
      }
    } 
    return true
  }

}
