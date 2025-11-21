import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UsuarioService } from './usuario-service';
import { Observable, switchMap } from 'rxjs';
import { FichaPetInterface, PetInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient, private userService: UsuarioService) {}

  getPetsByTutorId(tutorId: number): Observable<FichaPetInterface> {
    return this.userService.getUserType().pipe(
      switchMap((res) => {
        if (res.type === 'admin') {
          return this.http.get<FichaPetInterface>(
            `${environment.API_URL_ADMIN_PET_BY_USER_ID}/${tutorId}`
          );
        } else if (res.type === 'vet') {
          return this.http.get<FichaPetInterface>(
            `${environment.API_URL_VET_GET_PETS_BY_USER_ID}/${tutorId}`
          );
        } else {
          return this.http.get<FichaPetInterface>(
            `${environment.API_URL_CLIENTE_GET_PETS_BY_USER_ID}/${tutorId}`
          );
        }
      })
    );
  }

  getAllPets(): Observable<PetInterface[]> {
    return this.http.get<PetInterface[]>(environment.API_URL_VET_GET_ALL_PETS);
  }

  getUserType() {
    return this.http.get<{ type: string }>(environment.API_URL_AUTH_MY_TYPE);
  }

  updatePet(data: PetInterface) {
    if (data.type === 'admin') {
      return this.http.put(environment.API_URL_ADMIN_PET_UPDATE, data);
    } else if (data.type === 'vet') {
      return this.http.put(environment.API_URL_VET_PET_UPDATE, data);
    } else {
      return this.http.put(environment.API_URL_CLIENTE_PET_UPDATE, data);
    }
  }

  deleteAccountPet(id: number) {
    return this.http.delete(`${environment.API_URL_ADMIN_PET_DELETE}/${id}`);
  }

  createPet(data: PetInterface) {
    return this.http.post<PetInterface>(environment.API_URL_ADMIN_PET_REGISTER, data);
  }
}
