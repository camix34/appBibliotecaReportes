import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-agregar-categorias',
  standalone: false,
  templateUrl: './agregar-categorias.component.html',
  styleUrl: './agregar-categorias.component.css'
})
export class AgregarCategoriasComponent {
 
  categoria: Categoria = new Categoria();

  constructor(private idiomaServicio: CategoriaService, private router:Router) { }

   ngOnInit(): void {
    // Inicializa el objeto idioma si es necesario
   
  }

  guardarCategoria() {
    this.idiomaServicio.registrarCategoria(this.categoria).subscribe(dato => {
      console.log(dato);
      this.irALaListaCategorias();
    }, error => console.log(error));
  }

  irALaListaCategorias() {
    this.router.navigate(['/list_categorias']);
  }

  onSubmit() {
     this.guardarCategoria()
  }
}
