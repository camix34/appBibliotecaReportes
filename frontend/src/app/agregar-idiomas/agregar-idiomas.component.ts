import { Component } from '@angular/core';
import { Idioma } from '../idioma';
import { IdiomaService } from '../idioma.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-idiomas',
  standalone: false,
  templateUrl: './agregar-idiomas.component.html',
  styleUrl: './agregar-idiomas.component.css'
})
export class AgregarIdiomasComponent {

  idioma: Idioma = new Idioma();

  constructor(private idiomaServicio: IdiomaService, private router:Router) { }

  ngOnInit(): void {
    // Inicializa el objeto idioma si es necesario
   
  }

  guardarIdioma() {
    this.idiomaServicio.registrarIdioma(this.idioma).subscribe(dato => {
      console.log(dato);
      this.irALaListaIdiomas();
    }, error => console.log(error));
  }

  irALaListaIdiomas() {
    this.router.navigate(['/list_idiomas']);
  }

  onSubmit() {
     this.guardarIdioma()
  }


  
}
