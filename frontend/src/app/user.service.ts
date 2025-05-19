import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuariologin } from './usuariologin';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  //esta url contiene todos los usuarios en el backend
  private BaseURL = "http://localhost:8080/user/all";

  private URL = "http://localhost:8080/user_biblio";
  constructor(private http: HttpClient) { }

  
  getUserWithRole(username: string): Observable<any> {
    console.log(`Llamando al backend con el username: ${username}`);
    return this.http.get(`http://localhost:8080/user/rol?username=${username}`);
  }

  getRoles(): Observable<Rol[]> {
  return this.http.get<Rol[]>(`${this.URL}/roles`);
}

  //metodo para agregar un usario para el login
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post('http://localhost:8080/user/registrar', usuario);
  }

  //este metodo nos sirve para obtener los usuarios registrados
  obtenerListaUsuarios():Observable<Usuariologin[]>{
    return this.http.get<Usuariologin[]>(`${this.BaseURL}`);

  }

  //este metodo sirve para actualizar un usuario del login
  actualizarUsuario(id:number, usuariologin: Usuariologin) : Observable<Object>{

    return this.http.put(`${this.URL}/${id}`,usuariologin);
  }

  obtenerUsuarioLoginID(id:number) : Observable<Usuariologin>{
    return this.http.get<Usuariologin>(`${this.URL}/${id}`);
  }

  //este metodo sirve para eliminar un usuario del login
  eliminarUsuario(id:number) : Observable<Object>{
    return this.http.delete(`${this.URL}/${id}`);
  }
}