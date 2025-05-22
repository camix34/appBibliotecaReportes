import { Component } from '@angular/core';
import { Solicitud } from '../solicitud';
import { MaterialServiceService } from '../material-service.service';
import { PerfilService } from '../services/perfil.service';
import { Router } from '@angular/router';
import { MultaService } from '../services/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent {


  filtroBusqueda: string = '';
   
    p: number = 1;  
    itemsPerPage: number = 5;
    solicitudes: Solicitud[];

      constructor(private Materialservicio: MaterialServiceService,
     private route: Router, 
     private usuarioService:PerfilService,
     private usuarioMulta:MultaService
    ) {

  }
ngOnInit(): void {
    this.obtenerMateriales();
    
  }
  

  
  obtenerMateriales() {
    this.Materialservicio.obtenerSolicitudesPendientes().subscribe(dato => {
      this.solicitudes = dato;
    });
  }


  //metodo para buscar material
     solicitudesFiltradas(): Solicitud[] {
      if (!this.filtroBusqueda.trim()) {
        return this.solicitudes;
      }
  
      const filtro = this.filtroBusqueda.toLowerCase();
  
      const filtrados = this.solicitudes.filter(soli =>
        soli.id?.toString().toLowerCase().includes(filtro) ||
        soli.estado?.toLowerCase().includes(filtro) ||
        soli.material.titulo?.toLowerCase().includes(filtro) ||
        soli.usuario.carnet?.toString().includes(filtro) ||
        soli.fechaSolicitud?.toString().includes(filtro) 
       
      );
  
      // Paginación: Solo devolver los elementos de la página actual
      return filtrados.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);
    }


    confirmarSolicitud(solicitudId: number, aprobado: boolean): void {
    Swal.fire({
      title: aprobado ? '¿Aprobar solicitud?' : '¿Rechazar solicitud?',
      text: aprobado ? '¿Estás seguro que deseas aprobar esta solicitud?' : '¿Estás seguro que deseas rechazar esta solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Materialservicio.confirmarSolicitud(solicitudId, aprobado).subscribe({
          next: (resp) => {
            Swal.fire('Éxito', resp, 'success');
            this.solicitudes = this.solicitudes.filter(s => s.id !== solicitudId); // Quita la solicitud aprobada/rechazada
          },
          error: (err) => {
            console.error('Error al confirmar solicitud:', err);
            Swal.fire('Error', 'No se pudo confirmar la solicitud', 'error');
          }
        });
      }
    });
  }
}
