import { Component } from '@angular/core';
import { Idioma } from '../idioma';
import { IdiomaService } from '../idioma.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-idiomas',
  standalone: false,
  templateUrl: './lista-idiomas.component.html',
  styleUrl: './lista-idiomas.component.css'
})
export class ListaIdiomasComponent {

  idiomas: Idioma[];


  constructor(private idiomaServicio: IdiomaService, private route:Router) { 
    
  }

  ngOnInit(): void {

  this.obtenerIdiomas();
  }


  private obtenerIdiomas() {
    this.idiomaServicio.obtenerListaIdiomas().subscribe(dato => { 

      this.idiomas =dato;
    });
  }

//metodo que lleva a la vista para actualizar un idioma
  actualizarIdioma(id: Number) {
    this.route.navigate(['update_idioma', id]);
  }

  //metodo para eliminar un idioma
  eliminarIdioma(id: number) {
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
    this.idiomaServicio.eliminarIdioma(id).subscribe(dato => {
      console.log(dato);
      this.obtenerIdiomas();
    })
  }
  });
  }

  verDetallerIdioma(id: number) {
    this.route.navigate(['details_idioma', id]);
  }

   agregarIdioma() {
    this.route.navigate(['/add_idioma']);
  }

}
