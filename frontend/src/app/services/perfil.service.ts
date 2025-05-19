import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PerfilDTO } from '../dto/perfil-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:8080/user_biblio/perfil'
  constructor(private http: HttpClient) { }

  
  getPerfil(id: number): Observable<PerfilDTO> {
    return this.http.get<PerfilDTO>(`${this.apiUrl}/${id}`);
  }

}
