import { Component } from '@angular/core';
import { RestapiService } from '../restapi.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string = '';
  id_registrado:number;
  password:string = '';
  message:string | null = null;

  constructor(private service:RestapiService, private router: Router, private http: HttpClient){}

  ngOnInit(){

  }

  doLogin(){
     let resp = this.service.login(this.username, this.password);

  resp.subscribe((data: any) => {
    console.log("Login exitoso, obteniendo ID del usuario...");

    // Llamada para obtener el ID del usuario por su username
    this.service.getUsuarioByUsername(this.username).subscribe((usuario: any) => {
     
      // Guardar en localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('idusuario', usuario.usuario?.idusuario);
       localStorage.setItem('idusuario', usuario.usuario?.idusuario);
       localStorage.setItem('tipo',usuario.usuario?.tipo);

      if(this.username === 'administrador'){
        this.router.navigate(['/home'])
      }else{
           this.router.navigate(['/dashboard_user']);
      }
     
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bienvenido " + this.username,
        showConfirmButton: false,
        timer: 1500
      });

    }, error => {
      console.error("No se pudo obtener el ID del usuario", error);
    });

  }, err => {
    if (err.status === 401) {
      this.message = 'Usuario o contraseña incorrectos';
    } else {
      this.message = 'Error inesperado al iniciar sesión';
    }
  });
  }

  
  
}
