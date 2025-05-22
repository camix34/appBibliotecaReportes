import { Component } from '@angular/core';
import { PerfilDTO } from '../dto/perfil-dto';
import { PrestamoService } from '../prestamo.service';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { Prestamo } from '../prestamo';

import { OnInit } from '@angular/core';
import { MultaDto } from '../dto/multa-dto';
import { MultaService } from '../services/multa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-devolver-prestamo',
  standalone: false,
  templateUrl: './devolver-prestamo.component.html',
  styleUrls: ['./devolver-prestamo.component.css']
})
export class DevolverPrestamoComponent implements OnInit {

  prestamos: Prestamo[] = [];
  prestamosconMulta: MultaDto[]=[];
  perfilCompleto!: PerfilDTO;
  prestamoRetraso: MultaDto[] = [];
  tieneMultasActivas: boolean = false;
  estaPenalizado: boolean = false;
  montoTotalMultas: number = 0;
  multaSeleccionada: MultaDto | null = null;
  prestamoMultaDia: MultaDto;
  numeroTarjeta: string = '';
tipoTarjeta: string = 'Desconocido';


  constructor(
    private prestamoServicio: PrestamoService,
    private route: Router,
    private usuarioService: PerfilService,
    private multaService:MultaService
  ) { }

  ngOnInit(): void {

     

    const id = localStorage.getItem('idusuario');

    if (id) {
      const usuarioId = Number(id);

      // Cargar perfil
      this.usuarioService.getPerfil(usuarioId).subscribe({
        next: (data) => {
          this.perfilCompleto = data;
        },
        error: (err) => {
          console.error('Error al cargar el perfil completo:', err);
        }
      });
        this.cargarPrestamos();
    }
  }
 

   cargarPrestamos() {
     const id = localStorage.getItem('idusuario');
     const usuarioId = Number(id);

    this.multaService.obtenerPrestamosConEstado(usuarioId).subscribe({
    next: (data) => {
      this.prestamosconMulta = data;
      this.tieneMultasActivas = data.some(p => p.tieneMulta);
      this.estaPenalizado = data.some(p=> p.penalizado === true);
      this.montoTotalMultas = data
        .filter(p => p.tieneMulta)
        .reduce((acc, p) => acc + (p.monto || 0), 0);
      
    },
    error: (err) => console.error('Error al cargar préstamos', err),
    });
  }

  devolverPrestamo(idPrestamo: number): void {
    this.prestamoServicio.devolverPrestamo(idPrestamo).subscribe({
      next: (msg) => {
         Swal.fire({
          title: 'Éxito',
          text: msg,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        // Recargar préstamos
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al devolver préstamo:', err);
         Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al devolver el préstamo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
detectarTipoTarjeta() {
  if (this.numeroTarjeta.startsWith('4')) {
    this.tipoTarjeta = 'Visa';
  } else if (this.numeroTarjeta.startsWith('5')) {
    this.tipoTarjeta = 'MasterCard';
  } else {
    this.tipoTarjeta = 'Desconocido';
  }
}


//metodo para renovar un prestamo agregadole mas tiempo 
   renovarPrestamo(idPrestamo: number): void {
    this.prestamoServicio.renovarPrestamo(idPrestamo).subscribe({
      next: (msg) => {
        alert(msg);
       this.ngOnInit();
      },
      error: (err) => {
        console.error('Error al renovar préstamo:', err);
      }
    });
  }

  // metodo para verificar si el usuario puede renocar 
  puedeRenovar(): boolean {
    return this.perfilCompleto?.tipo !== 'ESTUDIANTE';// si es distinto que el rol ESTUDIANTE puede renovar
  }

  
}

