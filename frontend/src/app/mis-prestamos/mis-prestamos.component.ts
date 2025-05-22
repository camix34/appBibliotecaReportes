import { Component } from '@angular/core';
import { Material } from '../material';
import { PerfilDTO } from '../dto/perfil-dto';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { Historial } from '../historial';
import { HistorialService } from '../historial.service';

@Component({
  selector: 'app-mis-prestamos',
  standalone: false,
  templateUrl: './mis-prestamos.component.html',
  styleUrl: './mis-prestamos.component.css'
})
export class MisPrestamosComponent {

filtroBusqueda: string = '';
  p: number = 1;  
  itemsPerPage: number = 10;

  perfilCompleto!: PerfilDTO;
  historiales: Historial[] = [];

  constructor(
    private historialService: HistorialService, 
    private router: Router, 
    private usuarioService: PerfilService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('idusuario');

    if (id) {
      // Obtener perfil del usuario
      this.usuarioService.getPerfil(Number(id)).subscribe({
        next: (data) => {
          this.perfilCompleto = data;
          // Obtener historial de préstamos
          this.obtenerHistorialPrestamos(Number(id));
        },
        error: (err) => {
          console.error('Error al cargar el perfil completo:', err);
        }
      });
    } else {
      console.warn('No se encontró el idusuario en el localStorage');
    }
  }

  obtenerHistorialPrestamos(usuarioId: number): void {
    this.historialService.obtenerPrestamosPorUsuario(usuarioId).subscribe({
      next: (data) => {
        this.historiales = data;
        console.log('Historial de préstamos:', this.historiales);
      },
      error: (err) => {
        console.error('Error al obtener el historial de préstamos:', err);
      }
    });
  }

 materialesFiltrados(): Historial[] {
  if (!this.filtroBusqueda.trim()) {
    return this.historiales;  // Cambia this.historial por this.historiales
  }

  const filtro = this.filtroBusqueda.toLowerCase();

  return this.historiales.filter(historial =>
    historial.idHistorial?.toString().toLowerCase().includes(filtro) ||
    historial.idUsuario?.toString().toLowerCase().includes(filtro) ||
    historial.prestamo?.toString().toLowerCase().includes(filtro) ||
    historial.fechaPrestamo?.toString().toLowerCase().includes(filtro) ||
    historial.fechaDevolucion?.toString().includes(filtro) ||
    historial.fechaRegistro?.toString().includes(filtro) ||
    historial.material?.titulo?.toLowerCase().includes(filtro) 
  );
}
}
