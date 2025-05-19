import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-notificacion',
  standalone: false,
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent implements OnInit{

   notificaciones: any[] = [];
   // Obtener del sistema de autenticación
   unreadCount = 0;

  constructor(private http: HttpClient,private notificacionService: NotificacionService) { }

  ngOnInit(): void {
    this.cargarNotificaciones();

      this.notificacionService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
  }

  cargarNotificaciones(): void {
   const usuarioId = localStorage.getItem('idusuario');
   const idUsuario=Number(usuarioId);
    this.http.get<any[]>(`http://localhost:8080/api/notificaciones/usuario/${idUsuario}`)
      .subscribe(data => this.notificaciones = data);
  }

  marcarComoLeida(idNotificacion: number): void {
    this.http.patch(`http://localhost:8080/api/notificaciones/marcar-leida/${idNotificacion}`, {})
      .subscribe(() => {
        this.cargarNotificaciones(); // Recargar después de actualizar
        this.notificacionService.actualizarContador();
      });
  }

}
