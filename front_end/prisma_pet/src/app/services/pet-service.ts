import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UsuarioService } from './usuario-service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {

  constructor(
    private http: HttpClient,
    private userService: UsuarioService
  ) { }

  getPetsByTutorId(tutorId: number): Observable<any> {
    return this.userService.getUserType().pipe(
      switchMap(res => {
        if (res.type === 'admin') {
          return this.http.get(`${environment.API_URL_ADMIN_PET_BY_USER_ID}/${tutorId}`);
        } else if (res.type === 'vet') {
          return this.http.get(`${environment.API_URL_VET_GET_PETS_BY_USER_ID}/${tutorId}`);
        } else {
          return this.http.get(`${environment.API_URL_CLIENTE_GET_PETS_BY_USER_ID}/${tutorId}`);
        }
      })
    );
  }
}
