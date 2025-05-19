import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getAuthToken() : Observable <boolean>{
    const username = localStorage.getItem('username');
    // Si el username existe, el usuario está autenticado
    return of(!!username);
  }

  
  public loadScript(){
    let node = document.createElement('script');
    node.src='assets/js/plugins/chartjs.min.js';
    node.type= 'text/javascript';
    node.async = true;
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  getUserRole(): Observable<string> {

  
    return this.http.get('http://localhost:8080/user/rol', {responseType: 'text' });
  }
}