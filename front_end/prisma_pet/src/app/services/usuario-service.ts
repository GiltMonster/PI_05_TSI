import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  getUserData() {
    return this.http.get<UserInterface>(environment.API_URL_AUTH_ME);
  }

  getUserById(id: string) {
    return this.http.get(`${environment.API_URL_ADMIN_CLIENTE_BY_ID}/${id}`);
  }

  updateUser(data: any) {
    return this.http.put(environment.API_URL_ADMIN_CLIENTE_UPDATE, data);
  }

  deleteAccount(id: string) {
    return this.http.delete(`${environment.API_URL_ADMIN_CLIENTE_DELETE}/${id}`);
  }

}
