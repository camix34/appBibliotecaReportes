import { Component } from '@angular/core';
import { Idioma } from '../idioma';
import { IdiomaService } from '../idioma.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-idiomas',
  standalone: false,
  templateUrl: './actualizar-idiomas.component.html',
  styleUrl: './actualizar-idiomas.component.css'
})
export class ActualizarIdiomasComponent {

   id!: number;
    idiomas: Idioma = new Idioma();
  
    constructor(
      private idiomaServicio: IdiomaService,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.idiomaServicio.obternerIdiomaPorId(this.id).subscribe(data => {
        this.idiomas = data;
      }, error => console.log(error));
    }

    TraerIdioma(){
      
    }
  
    onSubmit() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar este idioma?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.idiomaServicio.actualizarIdioma(this.id, this.idiomas).subscribe({
          next: (data) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'El idioma se ha actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.irALaListaCategorias();
            });
          },
          error: (error) => {
            console.error(error);
            let errorMessage = 'Ocurrió un error al actualizar el idioma';
            
            // Personalizar mensaje según el tipo de error
            if (error.status === 400) {
              errorMessage = error.error.message || 'Datos inválidos para el idioma';
            } else if (error.status === 404) {
              errorMessage = 'El idioma no fue encontrado';
            } else if (error.status === 409) {
              errorMessage = 'Ya existe un idioma con ese nombre';
            } else if (error.status === 0) {
              errorMessage = 'No se pudo conectar con el servidor';
            }

            Swal.fire({
              title: 'Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
    });
  }
  
    irALaListaCategorias() {
      this.router.navigate(['/list_idiomas']);
    }
}
