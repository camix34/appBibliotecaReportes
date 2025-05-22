import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuariologin } from './usuariologin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient) { }

  private basePOSTURL = "http://localhost:8080/user/add";
  //logica para los endspoints del backen
  public login(username:string, password:string){
    const headers = new HttpHeaders({Authorization: 'Basic ' +btoa(username + ":" + password)})
   return this.http.get("http://localhost:8080/user/all",{headers,responseType:'text' as 'json'})
  }

  
  public getUsersAll(){
    let username = "administrador"
    let password = "123456"
    const headers = new HttpHeaders({Authorization: 'Basic ' +btoa(username + ":" + password)})
    return this.http.get("http://localhost:8080/user/all",{headers,responseType:'text' as 'json'})
  }

  getUsuarioByUsername(username: string): Observable<Usuariologin> {
  return this.http.get<Usuariologin>(`http://localhost:8080/user/username/${username}`);
}

 
 
}
