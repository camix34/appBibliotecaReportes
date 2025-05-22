import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  userCount: number = 0;
  constructor(private router: Router, private authService: AuthService, private usuarioService: UsuarioBiblioService) {
    this.authService.loadScript();
  }
  logout() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará tu sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
        Swal.fire('Sesión cerrada', '', 'success');
      }
    });
  
  }

  ngOnInit(): void {
      this.usuarioService.getUserCount().subscribe({
      next: count => this.userCount = count,
      error: err => console.error('Error al obtener usuarios:', err)
    });
  
  }


}
