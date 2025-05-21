import { Component, ElementRef, ViewChild } from '@angular/core';
import { Idioma } from '../idioma';
import { MaterialServiceService } from '../material-service.service';
import { Router } from '@angular/router';
import { Material } from '../material';
import { RestapiService } from '../restapi.service';
import { Categoria } from '../categoria';
import Swal from 'sweetalert2';

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
  filtrobusqueda: string = '';

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

    this.materialServicio.registrarMaterial(this.material).subscribe({
      next: (dato) => {
        console.log(dato);
        //sweet alert con el mesaje de exito al guardar el material
        Swal.fire({
          title: '¡Éxito!',
          text: 'El material se ha guardado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.irALaListaMateriales();
        });
      },
      error: (error) => {
        console.error(error);

        let errorMessage = 'Ocurrió un error al guardar el material';

        // mestra el mensaje segun el tipo de error que devuelva el backend
        if (error.status === 400) {
          errorMessage = error.error.message || 'Datos inválidos para el material';
        } else if (error.status === 409) {
          errorMessage = 'El material ya existe en el sistema';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }

        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
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
    if (this.archivos.length === 0) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Debes seleccionar una imagen para el material',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivos[0]);

    this.materialServicio.subirImagen(formData).subscribe({
      next: (respuesta) => {
        console.log('Imagen subida:', respuesta);
        this.material.imagen_portada = respuesta.url;
        this.guardarMaterial();
      },
      error: (err) => {
        console.error('Error al subir la imagen', err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo subir la imagen del material',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }


  volveraMateriales() {
    this.router.navigate(['list_materiales']);
  }

  generarISBN(tipomaterial: string) {
  // simumacion de un codigo ISBN 13 digitos empezando con 978
  const randomDigits = () => Math.floor(100000000 + Math.random() * 900000000); // 9 digitos aleatorios
  const isbn = `978-${randomDigits()}`;

  this.material.tipomaterial = isbn;
}

}
