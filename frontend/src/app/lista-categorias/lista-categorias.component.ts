import { Component } from '@angular/core';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-categorias',
  standalone: false,
  templateUrl: './lista-categorias.component.html',
  styleUrl: './lista-categorias.component.css'
})
export class ListaCategoriasComponent {

  
  categoria: Categoria[];
  filtroBusqueda: string = '';
  p: number = 1;  
  itemsPerPage: number = 5;



  constructor(private categoriaServicio: CategoriaService, private route:Router) { 
    
  }

  //cuando inicie 
   ngOnInit(): void {

  this.obtenerCategoria();
  }

// metodo para cargar categorias, llama al metodo obtenerListaCategoria en categoria service
  private obtenerCategoria() {
    this.categoriaServicio.obtenerListaCategorias().subscribe(dato => { 

      this.categoria =dato;
    });
  }

//metodo que lleva a la vista para actualizar una categoria
  


   //metodo para eliminar una categoria
    eliminarCategoria(id: number) {
      Swal.fire({
         title: '¿Estás seguro?',
        text: "Confirma si deseas eliminar al idioma",
        icon: 'warning', // Cambiado 'type' a 'icon'
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, elimínalo',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.isConfirmed){
      this.categoriaServicio.eliminarCategoria(id).subscribe(dato => {//llama al metodo eliminarCategoria en el service el cual llama a la api 
         console.log(dato);
        this.obtenerCategoria();
      })
    }
    });
    }

      verDetallerCategoria(id: number) {
    this.route.navigate(['details_categoria', id]);
  }

   agregarCategoria() {
    this.route.navigate(['/add_categoria']);
  }



  categoriasFiltradas(): Categoria[] {
    if (!this.filtroBusqueda.trim()) {
      return this.categoria;  
    }
  
    const filtro = this.filtroBusqueda.toLowerCase();
  
    return this.categoria.filter(cate =>
      cate.id?.toString().toLowerCase().includes(filtro) ||
      cate.nombreCategoria?.toString().toLowerCase().includes(filtro) ||
      cate.descripcion?.toString().toLowerCase().includes(filtro)
    
    );
  }

  
  actualizarCaregoria(id: Number) {
    this.route.navigate(['update_categoria', id]);
  }
}
