import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from './roles';
import { Permisos } from './permisos';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/user/roles'; // url para la api que obtenga los roles
 private apiURLROL = 'http://localhost:8080/user';
  

  getRoles(): Observable<RoleServiceService[]> {
    return this.http.get<RoleServiceService[]>(this.apiUrl);
  }

   getPermisos() {
    return this.http.get<Permisos[]>(`${this.apiURLROL}/permisos`);
  }

  crearRol(request: Roles) {
    return this.http.post(`${this.apiURLROL}/add_rol`, request, { responseType: 'text' });
  }


}
