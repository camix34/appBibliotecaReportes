import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

    private apiUrl = 'http://localhost:8080/api/notificaciones'; // Usa la URL completa aquí
  private unreadCount = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCount.asObservable();

  constructor(private http: HttpClient) {
    const idUsuario = localStorage.getItem('idusuario');
    if (idUsuario) {
      const parsedId = Number(idUsuario);
      interval(30000)
        .pipe(
          startWith(0),
          switchMap(() => this.getUnreadCount(parsedId))
        )
        .subscribe(count => this.unreadCount.next(count));
    }
  }

  getUnreadCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/contar-no-leidas/${userId}`);
  }

  actualizarContador(): void {
    const Id_usuario = localStorage.getItem('idusuario');
    if (!Id_usuario) return;

    this.getUnreadCount(Number(Id_usuario)).subscribe({
      next: (count) => this.unreadCount.next(count),
      error: (err) => console.error('Error al contar notificaciones no leídas:', err)
    });
  }
}
