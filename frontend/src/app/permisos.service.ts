import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/user/permisos'; // url para la api que obtenga los roles

  

  getPermisos(): Observable<PermisosService[]> {
    return this.http.get<PermisosService[]>(this.apiUrl);
  }
}
