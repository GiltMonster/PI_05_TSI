import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getTypeMenuUser(): Observable<{ type: string }> {
    return this.http.get<{type: string}>('http://127.0.0.1:8000/api/myType');

  }

}
