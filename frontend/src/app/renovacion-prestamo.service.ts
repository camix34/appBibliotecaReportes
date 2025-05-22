import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RenovacionPrestamo } from './renovacion-prestamo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenovacionPrestamoService {
 private baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }
  // Método para obtener la lista de solicitudes de renovacion
  obtenersolicitudesDevulucion(): Observable<RenovacionPrestamo[]> {
    return this.httpClient.get<[RenovacionPrestamo]>(`${this.baseURL}/prestamos/renovaciones/pendientes`);
  }

}
