import { Component } from '@angular/core';
import { Material } from '../material';
import { MaterialServiceService } from '../material-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-detalle',
  standalone: false,
  templateUrl: './material-detalle.component.html',
  styleUrl: './material-detalle.component.css'
})
export class MaterialDetalleComponent {

  Id: number;
  Material: Material;
   constructor(private route: ActivatedRoute, private materialServicio: MaterialServiceService, private routes: Router) {
  
  }

  ngOnInit(): void {
      this.Id = this.route.snapshot.params['id'];
      this.Material = new Material();
      this.materialServicio.obternerMaterialPorId(this.Id).subscribe(dato => {
        this.Material = dato;
      });
    }
  


  volveraMateriales() {
    this.routes.navigate(['list_materiales']);
  }
}
