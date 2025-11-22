import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CepInterface, UserInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  getUserType() {
    return this.http.get<{ type: string }>(environment.API_URL_AUTH_MY_TYPE);
  }

  getUserData() {
    return this.http.get<UserInterface>(environment.API_URL_AUTH_ME);
  }

  getUserById(id: string) {
    return this.http.get(`${environment.API_URL_ADMIN_CLIENTE_BY_ID}/${id}`);
  }

    getTutorById(id: string) {
    return this.http.get(`${environment.API_URL_CLIENTE_GET_CLIENTE_BY_ID}/${id}`);
  }

  updateUser(data: UserInterface) {
    if (data.type === 'admin') {
      return this.http.put(environment.API_URL_ADMIN_UPDATE, data);
    } else if (data.type === 'vet') {
      return this.http.put(environment.API_URL_VET_UPDATE, data);
    } else {
      return this.http.put(environment.API_URL_CLIENTE_UPDATE, data);
    }
  }

  deleteAccount(id: number) {
    return this.http.delete(`${environment.API_URL_ADMIN_CLIENTE_DELETE}/${id}`);
  }

  deleteAccountVet(id: number) {
    return this.http.delete(`${environment.API_URL_ADMIN_VET_DELETE}/${id}`);
  }

  findCEP(cep: string) {
    return this.http.get<CepInterface>(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  }

  createUser(data: UserInterface & { password_confirmation: string }) {
    return this.http.post<UserInterface>(environment.API_URL_REGISTER, data);
  }
}


