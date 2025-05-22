import { Component } from '@angular/core';
import { Categoria } from '../categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-detalle-categoria',
  standalone: false,
  templateUrl: './detalle-categoria.component.html',
  styleUrl: './detalle-categoria.component.css'
})
export class DetalleCategoriaComponent {

   id: number;
  categoria: Categoria;

  constructor(private route: ActivatedRoute, private idiomaServicio: CategoriaService, private router:Router) {
  
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoria = new Categoria();
    this.idiomaServicio.obternerCategoriaPorId(this.id).subscribe(dato => {
      this.categoria = dato;
    });
  }

  volverAListaCategoria(){
    this.router.navigate(['/list_categorias']);
  }
}
