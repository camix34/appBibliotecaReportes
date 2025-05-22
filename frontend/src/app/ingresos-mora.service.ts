import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IngresosMora } from './ingresos-mora';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresosMoraService {

  // URL de la API REST optiene todos los idiomas en el backend
  private baseURL = 'http://localhost:8080/api/ingresos_mora';
  constructor(private httpClient: HttpClient) { }


  // Método para obtener la lista de ingresos por mora
  obtenerListaIngresosMora(): Observable<IngresosMora[]> {
    return this.httpClient.get<IngresosMora[]>(`${this.baseURL}`);
  }

 

}
