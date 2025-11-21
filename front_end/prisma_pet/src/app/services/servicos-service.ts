import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ServicosInterface, UserInterface } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor(private http: HttpClient) {}

  getUserType() {
    return this.http.get<{ type: string }>(environment.API_URL_AUTH_MY_TYPE);
  }

  getUserData() {
    return this.http.get<UserInterface>(environment.API_URL_AUTH_ME);
  }

  deleteAccountServico(id: number) {
    return this.http.delete(`${environment.API_URL_SERVICO_DELETE}${id}`);
  }

  getAllServicos() {
    return this.http.get<Array<ServicosInterface>>(`${environment.API_URL_SERVICO_LIST_ALL}`);
  }

  updateServico(data: ServicosInterface) {
    return this.http.put(environment.API_URL_SERVICO_UPDATE, data);
  }

  createServico(data: ServicosInterface) {
    return this.http.post<ServicosInterface>(environment.API_URL_SERVICO_CREATE, data);
  }
}
