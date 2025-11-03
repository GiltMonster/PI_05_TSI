import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  constructor(private http: HttpClient) { }

  baseUrl: string ='http://127.0.0.1:8000';

  login(email: string, password: string) {
    return this.http.post<{token: string, name: string}>(this.baseUrl + '/api/login', {email, password}).pipe(
      tap((res) => {
        if (res.token && res.name) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
        }
      })
    );
  }

  logout () {
    return this.http.post(this.baseUrl + '/api/logout', {})
  }

  getMe () {}
}
