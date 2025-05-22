import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestamo } from './prestamo';
import { Observable } from 'rxjs';
import { RenovacionPrestamo } from './renovacion-prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }
 // Método para obtener la lista de prestamos del usuario que ha iniciado session
 obtenerPrestamosPorUsuario(usuarioId: number): Observable<Prestamo[]> {
    return this.httpClient.get<Prestamo[]>(`${this.baseURL}/prestamos/usuario/${usuarioId}`);
  }

  //metodo para devolver el prestamo 
  devolverPrestamo(idPrestamo: number): Observable<string> {
    return this.httpClient.post(`${this.baseURL}/prestamos/${idPrestamo}/return`, {}, { responseType: 'text' });
  }

 //metodo para renovar prestamo
 renovarPrestamo(idPrestamo:number): Observable<string>{
  return this.httpClient.put(`${this.baseURL}/prestamos/${idPrestamo}/renovar`, {}, { responseType: 'text' });
 }


 // Método para obtener la lista de prestamos
  obtenerListaPrestamosActivos(): Observable<Prestamo[]> {
    return this.httpClient.get<[Prestamo]>(`${this.baseURL}/prestamos`);
  }

   // Método para obtener la lista de solicitudes de renovacion
  obtenersolicitudesDevulucion(): Observable<RenovacionPrestamo[]> {
    return this.httpClient.get<[RenovacionPrestamo]>(`${this.baseURL}/prestamos/renovaciones/pendientes`);
  }

  //metodo para aprobar renovacion
 

  aprobarRenovacion(idPrestamo: number, aprobado: boolean): Observable<string> {
    const url = `${this.baseURL}/prestamos/${idPrestamo}/aprobar-renovacion?aprobado=${aprobado}`;
    return this.httpClient.put(url, {}, { responseType: 'text' as 'text' });
}

}





