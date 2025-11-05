import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginResponseInterface } from '../interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponseInterface>(environment.API_URL_AUTH_LOGIN, {email, password}).pipe(
      tap((res) => {
        if (res.token && res.name) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
        }
      })
    );
  }

  logout () {
    return this.http.post(environment.API_URL_AUTH_LOGOUT, {})
  }

  getMe () {}
}
