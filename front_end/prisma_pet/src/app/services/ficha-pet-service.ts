import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetConsulta, PetVacina } from '../interfaces';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FichaPetService {

  constructor(
    private http: HttpClient
  ) { }

  // Consultas:
  cadastrarConsulta(data: PetConsulta) {
    return this.http.post<PetConsulta>(environment.API_URL_VET_CADASTRAR_CONSULTA, data);
  }

  editarConsulta(data: PetConsulta) {
    return this.http.put<PetConsulta>(environment.API_URL_VET_EDITAR_CONSULTA, data);
  }

  deletarConsulta(id: number) {
    return this.http.delete<void>(`${environment.API_URL_VET_DELETAR_CONSULTA}/${id}`);
  }

  // Vacinas:
  cadastrarVacina(data: PetVacina) {
    return this.http.post<PetVacina>(environment.API_URL_VET_CADASTRAR_VACINA, data);
  }

  editarVacina(data: PetVacina) {
    return this.http.put<PetVacina>(environment.API_URL_VET_EDITAR_VACINA, data);
  }

  deletarVacina(id: number) {
    return this.http.delete<void>(`${environment.API_URL_VET_DELETAR_VACINA}/${id}`);
  }

}
