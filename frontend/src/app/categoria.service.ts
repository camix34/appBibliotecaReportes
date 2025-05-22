import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // URL de la API REST optiene todos los idiomas en el backend
  private baseURL = 'http://localhost:8080/api/categorias';
  constructor(private httpClient: HttpClient) { }

  
    // Método para obtener la lista de idiomas
    obtenerListaCategorias(): Observable<Categoria[]> {
      return this.httpClient.get<Categoria[]>(`${this.baseURL}`);
    }
  
    // Método para guardar un nuevo idioma
    registrarCategoria(categoria: Categoria): Observable<Object> {
      return this.httpClient.post(`${this.baseURL}`, categoria);
    }
  
//Método para actualizar la categirua
  actualizarCategoria(id: number ,categoria: Categoria): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, categoria);
  }

    obternerCategoriaPorId(id: number): Observable<Categoria> {
      return this.httpClient.get<Categoria>(`${this.baseURL}/${id}`);
    }
  
    eliminarCategoria(id: number): Observable<Object> {
      return this.httpClient.delete(`${this.baseURL}/${id}`);
    }

}
