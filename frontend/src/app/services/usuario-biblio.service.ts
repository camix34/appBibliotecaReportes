import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioBiblio } from '../usuario-biblio';
import { ActualizarEstudiante } from '../dto/actualizar-estudiante';
import { ActualizarBibliotecario } from '../dto/actualizar-bibliotecario';
import { ActualizarDocente } from '../dto/actualizar-docente';
import { MultaDto } from '../dto/multa-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioBiblioService {

  
   private apiUrlGET = 'http://localhost:8080/user_biblio/all'; 
   private apiUrl = 'http://localhost:8080/user_biblio'; 
   private apiUrlContrato = 'http://localhost:8080/user_biblio/contrato_all';
   private apiUrlCarrera = 'http://localhost:8080/user_biblio/carreras';  // URL del endpoint
   private apiUrlFacultad = 'http://localhost:8080/user_biblio/facultad';
  

  constructor(private http: HttpClient) {}

  //para añadir usuarios
  crearUsuarioBiblio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data);
  }

  //obtiene carreras del backend
   obtenerCarreras(): Observable<any> {
    return this.http.get<any>(this.apiUrlCarrera);
  }

  //obtiene carreras del backend
   obtenerFacultad(): Observable<any> {
    return this.http.get<any>(this.apiUrlFacultad);
  }
  obtenerTipoContrato(): Observable<any>{
    return this.http.get<any>(this.apiUrlContrato);
  }

  obtenerEspecialidad():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/especialidad_all`);
  }

  obtenerUsuariosBiblio(): Observable<UsuarioBiblio[]> {
    return this.http.get<UsuarioBiblio[]>(this.apiUrlGET);
  }

   //este metodo sirve para eliminar un usuario del login
  eliminarUsuarioBiblio(id:number) : Observable<Object>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  obtenerUsuarioBiblioID(id:number) : Observable<UsuarioBiblio>{
      return this.http.get<UsuarioBiblio>(`${this.apiUrl}/${id}`);
    }

    //servicio para actualizar un estudiante
  actualizarUsuarioEstudiante(dto: ActualizarEstudiante) : Observable<any>{
       return this.http.put(`${this.apiUrl}/update_user_student`, dto);
  }

  //servicio para actualizar un bibliotecario
  actualizarBibliotecario(dto: ActualizarBibliotecario): Observable<any>{
    return this.http.put(`${this.apiUrl}/update_user_bibliotecario`, dto);
  }

  actualizarDocente(dto: ActualizarDocente): Observable<any>{
    return this.http.put(`${this.apiUrl}/update_user_docente`,dto);
  }

   obtenerEstudiante(id: number): Observable<ActualizarEstudiante> {
    return this.http.get<ActualizarEstudiante>(`${this.apiUrl}/get_student/${id}`);
  }
  obtenerbibliotecario(id:number):Observable<ActualizarBibliotecario>{
    return this.http.get<ActualizarBibliotecario>(`${this.apiUrl}/get_bibliotecario/${id}`);
  }

  obtenerDocente(id:number):Observable<ActualizarDocente>{
    return this.http.get<ActualizarDocente>(`${this.apiUrl}/get_docente/${id}`);
  }

    getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

   //metodo para renovar el carnet
  renovarCarnet(id: number): Observable<any> {
  return this.http.put(`http://localhost:8080/user_biblio/renovar/${id}/carnet`, {});
}


  
}
