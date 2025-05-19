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
        this.categoriaServicio.actualizarCategoria(this.id, this.categoria).subscribe(data => {
          this.irALaListaCategorias();
        }, error => console.log(error));
      }
    });
  }

  irALaListaCategorias() {
    this.router.navigate(['/list_categorias']);
  }

}
