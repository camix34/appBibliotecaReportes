import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';
import { UsuarioBiblio } from '../usuario-biblio';
import { Usuariologin } from '../usuariologin';

@Component({
  selector: 'app-renovar-carnet',
  standalone: false,
  templateUrl: './renovar-carnet.component.html',
  styleUrl: './renovar-carnet.component.css'
})
export class RenovarCarnetComponent {
  
  
    filtro: string = '';
    roles: any[] = [];
    usuariosLista: UsuarioBiblio[];
    paginaActual: number = 0; // Página actual (comienza en 0)
    itemsPorPagina: number = 5; // Número de elementos por página
    usuariosFiltrados: UsuarioBiblio[];
    usuarioActualizar: UsuarioBiblio;
    usuariosrol: Usuariologin;
    roleEnum : any[];
    carreras:number;
    usuario: UsuarioBiblio;
    facultades:number;
  
  
  
  
    usuarios: {
    idusuario: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    carnet: string;
    email: string;
    telefono: string;
    tipo: string;
    direccion: string;
    fecha_registro: Date;
    roles: any[];
    carrera?: { nombre: string } | null;
    facultad?: { nombre: string } | null;
    area?: string;
    dui?: string;
  }[] = [];
  

   constructor(
    private listauser: UserService,private usuarioServicio: UserService,
     private route:Router,private usuariobiblio:UsuarioBiblioService,
    private router:ActivatedRoute){
  
  }

  
  ngOnInit(): void {
     this.usuariosFiltradosFunc();
     this.obtenerUsuariosLista();
  
     

  }
  
  usuariosFiltradosFunc() {
   

    if (!this.filtro) {
      this.usuariosFiltrados = this.usuariosLista;
    } else {
      const texto = this.filtro.toLowerCase();
      this.usuariosFiltrados = this.usuariosLista.filter(usuario =>
        usuario.nombre?.toLowerCase().includes(texto)||
        usuario.roles?.some((rol: string) => rol.toLowerCase().includes(texto))
       
       
      );
    }
    this.paginaActual = 0; // Reinicia la página si se filtra
  }


  private obtenerUsuariosLista(){
    this.usuariobiblio.obtenerUsuariosBiblio().subscribe(dato =>{
      this.usuariosLista = dato;
      console.log('Usuarios cargados:', this.usuariosLista);
      this.usuariosFiltrados = this.usuariosLista;
    });
  }
renovarCarnet(idusuario: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esto renovará el carnet y membresía por 1 año.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, renovar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuariobiblio.renovarCarnet(idusuario).subscribe({
        next: (respuesta) => {
          Swal.fire({
            icon: 'success',
            title: 'Renovado',
            text: 'Carnet y membresía renovados por 1 año.'
          }).then(() => {
            // ✅ Recargar la tabla aquí
            this.obtenerUsuariosLista();  // Este método debe actualizar tu tabla
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo renovar el carnet.'
          });
        }
      });
    }
  });
}


  
  usuariosPorPagina() {
    const startIndex = this.paginaActual * this.itemsPorPagina;
    const endIndex = (this.paginaActual + 1) * this.itemsPorPagina;
    return this.usuariosFiltrados.slice(startIndex, endIndex); // Slice para cortar los elementos de 5 en 5
  }

   // Cambiar la página (anterior o siguiente)
   cambiarPagina(cambio: number) {
    const nuevaPagina = this.paginaActual + cambio;
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPaginas()) {
      this.paginaActual = nuevaPagina;
    }
  }

  // Calcular el número total de páginas
  totalPaginas() {
    return Math.ceil(this.usuariosLista.length / this.itemsPorPagina);
  }


}
