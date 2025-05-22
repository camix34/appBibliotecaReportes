import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historial } from './historial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
 private baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  
    // Método para obtener la lista completa del historial de prestamos devueltos
    obtenerListaHistorial(): Observable<Historial[]> {
      return this.httpClient.get<Historial[]>(`${this.baseURL}/historial`);
    }



  //obtiene la lista de pretamos del usuario actual
   obtenerPrestamosPorUsuario(usuarioId: number): Observable<Historial[]> {
      return this.httpClient.get<Historial[]>(`${this.baseURL}/historial/usuario/${usuarioId}`);
    }
  
//obtiene los registros del usuario con mas prestamos;
    obtenerHistorialDelUsuarioConMasPrestamos(): Observable<Historial[]> {
  return this.httpClient.get<Historial[]>(`${this.baseURL}/historial/usuario/mas-prestamos`);
}

}
