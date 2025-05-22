import { Component, OnInit } from '@angular/core';
import { Usuariologin } from '../usuariologin';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';
import { UsuarioBiblio } from '../usuario-biblio';

@Component({
  selector: 'app-usuario-detalles',
  standalone: false,
  templateUrl: './usuario-detalles.component.html',
  styleUrl: './usuario-detalles.component.css'
})
export class UsuarioDetallesComponent implements OnInit{

  id:number;
  usuariobiblio:UsuarioBiblio;
  usuariologin:Usuariologin;
  usuario: Usuariologin | null = null;
  idusuario: number;
  roleEnum: string; 
  rolRecibido: string = '';
  nombre: string ='';//variable que recibe el nombre del listado
  carnet: string ='';//variable que recibe del carnet del listado
  apellido1: string='';
  apellido2: string='';
  email: string='';
  telefono:string='';
   tipo: 'ESTUDIANTE' | 'BIBLIOTECARIO'; ;
  direccion:string='';
  fecha_registro:string='';
  roles: any[];
  carrera:any[];
  facultad:any[];
  dui:string;
  area:string;
  

  constructor(private route:ActivatedRoute,private usuarioServicio: UserService, private router: Router,
    private usuariobiblioservice: UsuarioBiblioService
  ){
    this.id = this.route.snapshot.params['id']; //sirve para capturar el id en la ruta
    this.usuariobiblio = new UsuarioBiblio;
    this.usuariobiblioservice.obtenerUsuarioBiblioID(this.id).subscribe(dato=>{
      this.usuariobiblio = dato;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idusuario = +params.get('idusuario')!;
    });

    // Obtener el rol desde queryParams
   /* this.route.queryParams.subscribe(params => {
      this.rolRecibido = params['role'];
      this.usernameRecibido = params['username']

    
    });
 */
  
  
 this.route.queryParams.subscribe(params => {
      this.idusuario = Number(params['idusuario']),
      this.nombre = params['nombre'],
      this.carnet = params['carnet'],
      this.apellido1 = params['apellido1'],
      this.apellido2 = params['apellido2'],
      this.email = params['email'],
      this.telefono = params['telefono'],
      this.tipo = params['tipo'],
      this.direccion = params['direccion'],
      this.fecha_registro = params['fecha_registro'],
      this.roles = params['roles'],
      this.carrera = params['carrera'],
      this.facultad=params['facultad'],
      this.area=params['area'],
      this.dui=params['dui']

      console.log("estos idusuario",this.idusuario)
    
    });
    
  }

  volver(){
    this.router.navigate(['/list_users']);
  }

}
