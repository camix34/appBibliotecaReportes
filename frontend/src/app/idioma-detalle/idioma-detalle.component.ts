import { Component } from '@angular/core';
import { Idioma } from '../idioma';
import { ActivatedRoute, Router } from '@angular/router';
import { IdiomaService } from '../idioma.service';

@Component({
  selector: 'app-idioma-detalle',
  standalone: false,
  templateUrl: './idioma-detalle.component.html',
  styleUrl: './idioma-detalle.component.css'
})
export class IdiomaDetalleComponent {

   id: number;
  Idioma: Idioma;

  constructor(private route: ActivatedRoute, private idiomaServicio: IdiomaService, private router:Router) {
  
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Idioma = new Idioma();
    this.idiomaServicio.obternerIdiomaPorId(this.id).subscribe(dato => {
      this.Idioma = dato;
    });
  }

  volverAListaIdiomas(){
    this.router.navigate(['/list_idiomas']);
  }
}
