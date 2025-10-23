import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  constructor(private http: HttpClient) { }

  baseUrl: string ='http://127.0.0.1:8000';

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + '/api/login', {email, password})
  }

  logout () {
    return this.http.post(this.baseUrl + '/api/logout', {})
  }

  getMe () {}
}
