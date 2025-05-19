import { Component, ElementRef, ViewChild } from '@angular/core';
import { Material } from '../material';
import { Categoria } from '../categoria';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { RestapiService } from '../restapi.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Idioma } from '../idioma';


@Component({
  selector: 'app-actualizar-materiales',
  standalone: false,
  templateUrl: './actualizar-materiales.component.html',
  styleUrl: './actualizar-materiales.component.css'
})
export class ActualizarMaterialesComponent {

  public archivos: any[] = []
  urlImagen: any = null;
  material: Material = new Material();
  categorias: Categoria[] = [];
  archivoSeleccionado!: File;
  materiales: Material[] = [];
  idiomas: Idioma[] = [];

  filtrobusqueda: string = '';

  @ViewChild('archivoInput') archivoInput!: ElementRef<HTMLInputElement>;

  constructor(private materialServicio: MaterialServiceService,
    private router: Router, private rest: RestapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.archivos = [];

    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.obtenerMaterial(id);
    });


    //traer las categorias al select
    this.materialServicio.getCategorias().subscribe(data => {
      this.categorias = data;
    });

    // traer lod idiomas al select
    this.materialServicio.getIdiomas().subscribe(data => {
      this.idiomas = data;
    });
  }

  obtenerMaterial(id: number): void {
    this.materialServicio.obternerMaterialPorId(id).subscribe(data => {
      this.material = data;
      this.urlImagen = 'URL_BASE_DEL_SERVIDOR/' + this.material.imagen_portada; // Ajusta según tu backend
    }, error => console.error(error));
  }


  onSubmit() {
    //this.guardarMaterial();
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas actualizar al idioma",
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.subirArchivo3();
      }
    });

  }



  guardarMaterial() {

    this.material.idCategoria = { id: this.material.idCategoria };
    this.material.idIdioma = { id: this.material.idIdioma };
    this.materialServicio.actualizarMaterial(this.material.id_material, this.material).subscribe(dato => {
      console.log(dato);
      this.irALaListaMateriales();
    }, error => console.log(error));
  }

  irALaListaMateriales() {
    this.router.navigate(['/list_materiales']);
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
