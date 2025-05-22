import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MultaDto } from '../dto/multa-dto';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  constructor(private http:HttpClient) { }
    apiUrl = "http://localhost:8080/api/prestamo/usuario/multa";

   apiDefault= "http://localhost:8080/api";

   obtenerPrestamosConEstado(usuarioId: number): Observable<MultaDto[]> {
    return this.http.get<MultaDto[]>(`${this.apiUrl}/${usuarioId}`);
  }

  pagarMultas(idUsuario: number): Observable<any> {
  return this.http.post(`${this.apiDefault}/pagar-multas/${idUsuario}`, null, { responseType: 'text' });
}

pagarPenalizacionMultas(idUsuario: number): Observable<any>{
  return this.http.delete(`${this.apiDefault}/eliminar-multa/${idUsuario}`, { responseType: 'text' });
}

}
