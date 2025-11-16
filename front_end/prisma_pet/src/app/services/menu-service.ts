import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getTypeMenuUser(): Observable<{ type: string }> {
    return this.http.get<{type: string}>(environment.API_URL_AUTH_MY_TYPE);

  }

}
