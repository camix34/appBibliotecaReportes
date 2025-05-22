import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosMora } from '../dto/usuarios-mora';

@Injectable({
  providedIn: 'root'
})
export class UsuariosMoraService {


   private baseUrl = 'http://localhost:8080/api/usuarios_mora/all';
 constructor(private http: HttpClient) {}

  getUsuariosMora(): Observable<UsuariosMora[]> {
    return this.http.get<UsuariosMora[]>(this.baseUrl);
  }

}
