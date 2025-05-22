import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-categoria',
  standalone: false,
  templateUrl: './actualizar-categoria.component.html',
  styleUrl: './actualizar-categoria.component.css'
})
export class ActualizarCategoriaComponent implements OnInit {

  id!: number;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaServicio: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoriaServicio.obternerCategoriaPorId(this.id).subscribe(data => {
      this.categoria = data;
    }, error => console.log(error));
  }

 onSubmit() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaServicio.actualizarCategoria(this.id, this.categoria).subscribe({
          next: (data) => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'La categoría se ha actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.irALaListaCategorias();
            });
          },
          error: (error) => {
            console.error(error);
            let errorMessage = 'Ocurrió un error al actualizar la categoría';
            
            // mensaje personalisado dependienfo del tipo de error que ocurrio
            if (error.status === 400) {
              errorMessage = error.error.message || 'Datos inválidos para la categoría';
            } else if (error.status === 404) {
              errorMessage = 'La categoría no fue encontrada';
            } else if (error.status === 409) {
              errorMessage = 'Ya existe una categoría con ese nombre';
            } else if (error.status === 0) {
              errorMessage = 'No se pudo conectar con el servidor';
            }else {
              errorMessage = 'Verifique que la descripcion no sea mayor a 20 caracteres';
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
    this.router.navigate(['/list_categorias']);
  }

}
