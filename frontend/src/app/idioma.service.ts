import { Injectable } from '@angular/core';
import { Idioma } from './idioma';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  // URL de la API REST optiene todos los idiomas en el backend
  private baseURL = 'http://localhost:8080/api/idiomas';
  constructor(private httpClient: HttpClient) { }


  // Método para obtener la lista de idiomas
  obtenerListaIdiomas(): Observable<Idioma[]> {
    return this.httpClient.get<Idioma[]>(`${this.baseURL}`);
  }

  // Método para guardar un nuevo idioma
  registrarIdioma(idioma: Idioma): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, idioma);
  }

  actualizarIdioma(id: number ,idioma: Idioma): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, idioma);
  }

  
  obternerIdiomaPorId(id: number): Observable<Idioma> {
    return this.httpClient.get<Idioma>(`${this.baseURL}/${id}`);
  }

  eliminarIdioma(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

}
