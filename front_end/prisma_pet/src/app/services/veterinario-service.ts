import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PetInterface, UserInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class VeterinarioService {
  constructor(
    private http: HttpClient
  ) { }

  getPetsByUserId(userId: string) {
    return this.http.get(`${environment.API_URL_VET_GET_PET_BY_ID}/${userId}`);
  }

  getAllTutors() {
    return this.http.get<Array<UserInterface>>(`${environment.API_URL_VET_GET_TUTORS_LIST}`);
  }

    getAllVets() {
  return this.http.get<UserInterface[]>(environment.API_URL_ADMIN_VET_LIST);
}
}
