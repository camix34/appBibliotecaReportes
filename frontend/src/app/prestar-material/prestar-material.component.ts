import { Component } from '@angular/core';
import { Material } from '../material';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { PerfilDTO } from '../dto/perfil-dto';
import { PerfilService } from '../services/perfil.service';
import { MultaDto } from '../dto/multa-dto';
import { MultaService } from '../services/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prestar-material',
  standalone: false,
  templateUrl: './prestar-material.component.html',
  styleUrl: './prestar-material.component.css'
})
export class PrestarMaterialComponent {

   filtroBusqueda: string = '';
 
  p: number = 1;  
  itemsPerPage: number = 5;
  materiales: Material[];
  perfilCompleto!: PerfilDTO;
  multa: MultaDto[] = [];

  constructor(private Materialservicio: MaterialServiceService,
     private route: Router, 
     private usuarioService:PerfilService,
     private usuarioMulta:MultaService
    ) {

  }

  ngOnInit(): void {
    this.obtenerMateriales();
    const id = localStorage.getItem('idusuario');
    const idusuario = Number(id);

    if (id) {
      this.usuarioService.getPerfil(Number(id)).subscribe({
        next: (data) => {
          console.log('Expediente completo:', data);
          this.perfilCompleto = data;
        },
        error: (err) => {
          console.error('Error al cargar el perfil completo:', err);
        }
      });
    } else {
      console.warn('No se encontró el idusuario en el localStorage');
    }

     this.usuarioMulta.obtenerPrestamosConEstado(idusuario).subscribe((data: MultaDto[]) => {
      this.multa = data;
    });
  }
  

  obtenerMateriales() {
    this.Materialservicio.obtenerListaMateriales().subscribe(dato => {
      this.materiales = dato;
    });
  }

  tieneMultaActiva(): boolean {
  return this.multa.some(m => m.tieneMulta === true);
}

   verDetallesMaterial(id: number) {
    this.route.navigate(['borrow_material', id]);
    
  }

  //metodo para buscar material
   materialesFiltrados(): Material[] {
    if (!this.filtroBusqueda.trim()) {
      return this.materiales;
    }

    const filtro = this.filtroBusqueda.toLowerCase();

    const filtrados = this.materiales.filter(material =>
      material.titulo?.toLowerCase().includes(filtro) ||
      material.autor?.toLowerCase().includes(filtro) ||
      material.tipomaterial?.toLowerCase().includes(filtro) ||
      material.aniopublicacion?.toString().includes(filtro) ||
      material.stockdisponible?.toString().includes(filtro) ||
      material.idCategoria?.nombreCategoria?.toLowerCase().includes(filtro)
    );

    // Paginación: Solo devolver los elementos de la página actual
    return filtrados.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);
  }

//metodo para prestar antiguo
 prestar(materialId: number) {
    const idUsuario = localStorage.getItem('idusuario');

    if (!idUsuario) {
      console.warn('No se encontró el ID de usuario en localStorage');
      return;
    }

    this.Materialservicio.prestarMaterial(materialId, Number(idUsuario)).subscribe({
      next: (response) => {
        console.log('Material prestado exitosamente', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Material prestado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.obtenerMateriales(); // Actualizar lista de materiales
      },
      error: (err) => {
        console.error('Error al prestar el material', err);
        Swal.fire({
          title: 'Error',
          text: 'Error al prestar material. Verifique que no tenga más de 5 préstamos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

//metodo para solicitar prestamo
  solicitarPrestamo(materialId: number) {
  const idUsuario = localStorage.getItem('idusuario');

  if (!idUsuario) {
    console.warn('No se encontró el ID de usuario en localStorage');
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Deseas solicitar el préstamo de este material?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, solicitar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.Materialservicio.solicitarMaterial(materialId, Number(idUsuario)).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Solicitud enviada',
            text: response,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.obtenerMateriales(); // Actualizar lista
        },
        error: (error) => {
          console.error('Error al solicitar el material', error);
          Swal.fire({
            title: 'Error',
            text: error.error || 'No se pudo solicitar el préstamo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  });
}
  
}







