import { Component } from '@angular/core';
import { Solicitud } from '../solicitud';
import { MaterialServiceService } from '../material-service.service';
import { PerfilService } from '../services/perfil.service';
import { Router } from '@angular/router';
import { MultaService } from '../services/multa.service';
import Swal from 'sweetalert2';
import { Prestamo } from '../prestamo';
import { PrestamoService } from '../prestamo.service';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent {


  filtroBusqueda: string = '';
    filtroBusqueda2: string = '';
    p: number = 1;  
    itemsPerPage: number = 5;
    solicitudes: Solicitud[];
    prestamo: any[]; // Cambia el tipo a any[] para aceptar ambos tipos, o usa RenovacionPrestamo[] si tienes la interfaz

      constructor(private Materialservicio: MaterialServiceService,
     private route: Router, 
     private usuarioService:PerfilService,
     private usuarioMulta:MultaService,
     private prestamoServicio: PrestamoService,
    ) {

  }
ngOnInit(): void {
    this.obtenerMateriales();
    this.obtenerSolicitudesRenovacion()
    
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


  obtenerSolicitudesRenovacion(){
        this.prestamoServicio.obtenersolicitudesDevulucion().subscribe(dato => {
      this.prestamo = dato;
    });
  }


   //metodo para buscar material
    renovacionesFiltradas(): Prestamo[] {
      if (!this.filtroBusqueda2.trim()) {
        return this.prestamo;
      }
  
      const filtro = this.filtroBusqueda2.toLowerCase();
  
      const filtrados = this.prestamo.filter(soli =>
        soli.id_Prestamo?.toString().toLowerCase().includes(filtro) ||
        soli.usuario.idusuario?.toString().toLowerCase().includes(filtro) ||
        soli.usuario.carnet?.toString().toLowerCase().includes(filtro) ||
        soli.materialEntity.titulo?.toLowerCase().includes(filtro) ||
        soli.fecha_prestamo?.toString().includes(filtro) ||
        soli.fecha_devolucion?.toString().includes(filtro)||
        soli.FECHA_DEVOLUCION_REAL?.toString().toLowerCase().includes(filtro) 
       
      );
  
      // Paginación: Solo devolver los elementos de la página actual
      return filtrados.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);
    }

    confirmarRenovacion(idPrestamo: number, aprobado: boolean): void {
  Swal.fire({
    title: aprobado ? '¿Aprobar renovación?' : '¿Rechazar renovación?',
    text: aprobado ? '¿Estás seguro que deseas aprobar esta renovación?' : '¿Estás seguro que deseas rechazar esta renovación?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.prestamoServicio.aprobarRenovacion(idPrestamo, aprobado).subscribe({
        next: (resp) => {
          Swal.fire('Éxito', resp, 'success');
          this.prestamo = this.prestamo.filter(p => p.id_Prestamo !== idPrestamo);
        },
        error: (err) => {
          console.error('Error al procesar la renovación:', err);
          Swal.fire('Error', 'No se pudo procesar la renovación', 'error');
        }
      });
    }
  });
}

}
