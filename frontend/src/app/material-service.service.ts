import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria';
import { Material } from './material';
import { HttpClient } from '@angular/common/http';
import { Idioma } from './idioma';

@Injectable({
  providedIn: 'root'
})
export class MaterialServiceService {

private baseURL = 'http://localhost:8080/api/materiales';
  private baseUrl2 ='http://localhost:8080/api';
  constructor(private httpClient: HttpClient) { }



  // Método para obtener la lista de materiales
  obtenerListaMateriales(): Observable<Material[]> {
    return this.httpClient.get<Material[]>(`${this.baseURL}`);
  }

  // Método para guardar un nuevo material
  registrarMaterial(materuial: Material): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, materuial);
  }

  actualizarMaterial(id: number, material: Material): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, material);
  }


  obternerMaterialPorId(id: number): Observable<Material> {
    return this.httpClient.get<Material>(`${this.baseURL}/${id}`);
  }

  eliminarMaterial(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

subirImagen(formData: FormData): Observable<{ url: string }> {
  return this.httpClient.post<{ url: string }>('http://localhost:8080/api/materiales/upload', formData);
}

  
getCategorias(): Observable<Categoria[]> {
  return this.httpClient.get<Categoria[]>(`${this.baseUrl2}/categorias`);
}

getIdiomas(): Observable<Idioma[]> {
  return this.httpClient.get<Idioma[]>(`${this.baseUrl2}/idiomas`);
}


prestarMaterial(materialId: number, usuarioId: number): Observable<any> {
  const url = `http://localhost:8080/api/materiales/${materialId}/borrow/${usuarioId}`;
  return this.httpClient.post(url, null); // Si no mandas cuerpo, pasa `null`
}



}
