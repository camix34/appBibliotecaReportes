import { Component, ElementRef, ViewChild } from '@angular/core';
import { Idioma } from '../idioma';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { Material } from '../material';
import { RestapiService } from '../restapi.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-agregar-materiales',
  standalone: false,
  templateUrl: './agregar-materiales.component.html',
  styleUrl: './agregar-materiales.component.css'
})
export class AgregarMaterialesComponent {

  public archivos: any[] = []
  urlImagen: any = null;
  material: Material = new Material();
  categorias: Categoria[] = [];
   archivoSeleccionado!: File;
   materiales: Material[] = [];
   idiomas: Idioma[] = [];

   filtrobusqueda:string = '';

  @ViewChild('archivoInput') archivoInput!: ElementRef<HTMLInputElement>;

  constructor(private materialServicio: MaterialServiceService, private router: Router, private rest: RestapiService) { }

  ngOnInit(): void {
    // Inicializa el objeto idioma si es necesario
    this.archivos = [];
    this.materialServicio.getCategorias().subscribe(data => {
      this.categorias = data;
    });


      this.materialServicio.getIdiomas().subscribe(data => {
    this.idiomas = data;
  });
  }

  guardarMaterial() {

    this.material.idCategoria = { id: this.material.idCategoria }; 
    this.material.idIdioma = { id: this.material.idIdioma };
    this.materialServicio.registrarMaterial(this.material).subscribe(dato => {
      console.log(dato);
      this.irALaListaMateriales();
    }, error => console.log(error));
  }


  irALaListaMateriales() {
    this.router.navigate(['/list_materiales']);
  }

  onSubmit() {
    //this.guardarMaterial();
    this.subirArchivo3();
  }


  //metodo para mostrar la imagen como una previsualizacion
  capturarfile(event: any): void {
    const archivoCapturado = event.target.files[0];
    this.archivos = [archivoCapturado]; // sobreescribimos por si solo se permite uno

    // Crear una URL temporal para mostrar la imagen
    this.urlImagen = URL.createObjectURL(archivoCapturado);
   
  }

 

subirArchivo3(): void {
  if (this.archivos.length === 0) return;

  const formData = new FormData();
  formData.append('archivo', this.archivos[0]);

  this.materialServicio.subirImagen(formData).subscribe({
    next: (respuesta) => {
      console.log('Imagen subida:', respuesta);
      // El backend devuelve solo el nombre limpio, así que lo mantenemos
      this.material.imagen_portada = respuesta.url;
      this.guardarMaterial(); // Aquí llamas a guardar el material en la base de datos
    },
    error: (err) => console.error('Error al subir la imagen', err)
  });
}



 volveraMateriales() {
    this.router.navigate(['list_materiales']);
  }

}
