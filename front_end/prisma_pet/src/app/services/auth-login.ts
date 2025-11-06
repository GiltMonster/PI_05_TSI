import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse, VerifyTokenResponse } from '../interfaces';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(environment.API_URL_AUTH_LOGIN, { email, password }).pipe(
      tap((res) => {
        if (res.token && res.name) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
        }
      })
    );
  }

  logout() {
    return this.http.post(environment.API_URL_AUTH_LOGOUT, {})
  }

  verifyToken() {
    return this.http.get<VerifyTokenResponse>(environment.API_URL_AUTH_VERIFY_TOKEN).pipe(
      tap({
        next: (res) => {
          if (res.valid) {
            if (res.user.type === 'admin' || res.user.type === 'user' || res.user.type === 'vet') {
              this.router.navigate(['/' + res.user.type]);
            } else {
              this.router.navigate(['/login']);
            }
          }
        }
      }),
      catchError((err) => {
        console.log("User not authenticated");
        this.router.navigate(['/login']);
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }
        return [];
      })
    );
  }
}
