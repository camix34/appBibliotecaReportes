import { Component } from '@angular/core';
import { Material } from '../material';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-lista-materiales',
  standalone: false,
  templateUrl: './lista-materiales.component.html',
  styleUrl: './lista-materiales.component.css'
})
export class ListaMaterialesComponent {
  filtroBusqueda: string = '';
 
  p: number = 1;  
  itemsPerPage: number = 5;
  materiales: Material[];

  constructor(private Materialservicio: MaterialServiceService, private route: Router) {

  }

  ngOnInit(): void {

    this.obtenerMateriales();
  }

  private obtenerMateriales() {
    this.Materialservicio.obtenerListaMateriales().subscribe(dato => {

      this.materiales = dato;

    });
  }


  actualizarMaterial(id: Number) {
    this.route.navigate(['update_material', id]);
  }


  eliminarMaterial(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el material",
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.Materialservicio.eliminarMaterial(id).subscribe(dato => {
          console.log(dato);
          this.obtenerMateriales();
        })
      }
    });
  }

  verDetallesMaterial(id: number) {
    this.route.navigate(['details_material', id]);
    
  }


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
      material.idCategoria?.nombreCategoria?.toLowerCase().includes(filtro) ||
      material.idIdioma?.nombreIdioma?.toLowerCase().includes(filtro)
    );

    // Paginación: Solo devolver los elementos de la página actual
    return filtrados.slice((this.p - 1) * this.itemsPerPage, this.p * this.itemsPerPage);
  }

  agregarMaterial() {
    this.route.navigate(['add_material']);
  }


}
