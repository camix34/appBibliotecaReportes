import { Component, OnInit } from '@angular/core';
import { Usuariologin } from '../usuariologin';
import { UserService } from '../user.service';
import { Rol } from '../rol';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UsuarioBiblio } from '../usuario-biblio';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: false,
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{

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
    console.log("roles desde el init",this.roles);
     

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

  eliminarUsuario(idusuario:number){
    
     Swal.fire({
         title: "¿Deseas eliminar el usuario?",
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: "Eliminar Usuario",
         denyButtonText: `No Eliminar`
       }).then((result) => {
         if (result.isConfirmed) {
           this.usuariobiblio.eliminarUsuarioBiblio(idusuario).subscribe({
             next: res => {
               console.log('Usuario eliminado con éxito', res);
                this.obtenerUsuariosLista();
               Swal.fire("Eliminado con éxito!", "", "success");
             
             },
             error: err => {
               console.error('Error al eliminar usuario', err);
               Swal.fire("Error al elinminar", err.error.message || "Error desconocido", "error");
             }
           });
         } else if (result.isDenied) {
           Swal.fire("Cancelado!", "", "info");
         }
       });
     
   }
    
   verDetalles(usuario:any){
      
      this.route.navigate(['details_user', usuario.idusuario], {
      queryParams: {
         idusuario:usuario.idusuario,
         nombre: usuario.nombre,
         carnet: usuario.carnet,
         apellido1: usuario.apellido1,
         apellido2: usuario.apellido2,
         email : usuario.email,
         telefono: usuario.telefono,
         tipo: usuario.tipo,
         direccion: usuario.direccion,
         fecha_registro: usuario.fecha_registro,
         roles: JSON.stringify(usuario.roles), // Convertimos el array a string
         carrera: usuario.carrera?.nombre || '',
         facultad: usuario.facultad?.nombre || '',
         area: usuario.area || '',
         dui: usuario.dui || ''
        }
    });
  }

   ActualizarUsuario(usuario:any){
  
      this.route.navigate(['update_user_biblio', usuario.idusuario], {
    queryParams: {
      idusuario: usuario.idusuario,
      nombre: usuario.nombre,
      carnet: usuario.carnet,
      apellido1: usuario.apellido1,
      apellido2: usuario.apellido2,
      email: usuario.email,
      telefono: usuario.telefono,
      tipo: usuario.tipo,
      direccion: usuario.direccion,
      carreraId: usuario.carrera,
      facultadId: usuario.facultad,
      area: usuario.area || '',
      dui: usuario.dui || '',
      especialidad: usuario.id_especialidad
       
    }
   
  });
  
  }
  }