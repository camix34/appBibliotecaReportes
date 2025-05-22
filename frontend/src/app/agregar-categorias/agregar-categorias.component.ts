import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-categorias',
  standalone: false,
  templateUrl: './agregar-categorias.component.html',
  styleUrl: './agregar-categorias.component.css'
})
export class AgregarCategoriasComponent {
 
  categoria: Categoria = new Categoria();

  constructor(private categoriaServicio: CategoriaService, private router:Router) { }

   ngOnInit(): void {
    // Inicializa el objeto idioma si es necesario
   
  }

  guardarCategoria() {
    this.categoriaServicio.registrarCategoria(this.categoria).subscribe({
      next: (dato) => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'La categoría se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.irALaListaCategorias();
        });
      },
      error: (error) => {
        console.error(error);
        let errorMessage = 'Ocurrió un error al registrar la categoría';
        
        // mensaje segun el tipo de error 
        if (error.status === 400) {
          errorMessage = error.error.message || 'Datos inválidos para la categoría';
        } else if (error.status === 409) {
          errorMessage = 'Ya existe una categoría con ese nombre';
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

  irALaListaCategorias() {
    this.router.navigate(['/list_categorias']);
  }

  onSubmit() {
     this.guardarCategoria()
  }
}
