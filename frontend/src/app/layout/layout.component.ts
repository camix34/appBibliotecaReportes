import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { RestapiService } from '../restapi.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user.service';
import { PerfilDTO } from '../dto/perfil-dto';
import { PerfilService } from '../services/perfil.service';
import { MultaDto } from '../dto/multa-dto';
import { MultaService } from '../services/multa.service';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  currentRouteName: string = '';
  userRole: string = '';
  role: string | null = null;
  user: any;
  username: string = '';
  roleEnum: string = '';
  perfilCompleto!: PerfilDTO;
  multa: MultaDto[] = [];
  esPenalizado: boolean = false;
   
  
  unreadCount = 0;
  user1: any;

  constructor(private router: Router,private authService: AuthService, private userService: UserService, private route: ActivatedRoute,
    private  usuarioService:PerfilService,
    private usuarioMulta:MultaService,
    private notificacionService: NotificacionService
  ) {

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.setRouteName(event.urlAfterRedirects);
    });
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

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.notificacionService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    this.notificacionService.actualizarContador(); // Llamada inicial
  

    
    this.authService.getUserRole().subscribe({
      next: (rol) => this.role = rol,
      error: () => this.role = null
    });

    const username = localStorage.getItem('username');

    if (username) {
      this.userService.getUserWithRole(username).subscribe({
        next: (res) => this.user = res,
        error: (err) => console.error('Error al cargar usuario:', err)
      });
    }
    console.log(this.role);

    const id = localStorage.getItem('idusuario');
 

      if (!id || id === 'undefined' || isNaN(Number(id))) {
  // Es un administrador (no tiene perfil en la tabla usuario)
  this.perfilCompleto = {
    tipo: 'Administrador',
    username: localStorage.getItem('username') ?? 'admin',
    // Rellena los otros campos si es necesario, o marca como opcionales en el modelo
  } as PerfilDTO;
} else {
  this.usuarioService.getPerfil(Number(id)).subscribe({
    next: (data) => {
      console.log('Perfil completo:', data);
      this.perfilCompleto = data;
    },
    error: (err) => {
      console.error('Error al cargar el perfil completo:', err);
    }
  });
}

 const idusu = localStorage.getItem('idusuario');
    const idusuario = Number(idusu);
    
    this.usuarioMulta.obtenerPrestamosConEstado(idusuario).subscribe((data: MultaDto[]) => {
    this.multa = data;
    this.esPenalizado = this.multa.some(m => m.penalizado);
  });
  
    
  }
  
  estaPenalizado(): boolean {
  return this.multa.some(m => m.penalizado === true);
}

  setRouteName(url: string) {
  if (url.startsWith('/details_user/')) {
    this.currentRouteName = 'Detalles del usuario';
    return;
  }
  else if (url.startsWith('/update_user/')) {
    this.currentRouteName = 'Actualizar usuario';
    return;
  }

    switch (url) {
      case '/home':
        this.currentRouteName = 'Dasboard';
        break;
      case '/add_user_biblio':
        this.currentRouteName = 'Agregar Usuarios';
        break;
      case '/list_users':
          this.currentRouteName = 'Lista de Usuarios Registrados';
          break;
      case '/details_user':
        this.currentRouteName = 'Detalles del usuario';
        break;
      case '/add_rol':
        this.currentRouteName = 'Agregar un Rol';
        break;
       case '/see_profile':
        this.currentRouteName = 'Mi Perfil';
        break;
       case '/dashboard_user':
        this.currentRouteName = 'Mis actividades';
        break;
      case '/pagar_multa':
        this.currentRouteName = 'Pagar Multa';
       break;
      case '/usuarios_mora':
        this.currentRouteName = 'Detalles de usuarios con mora';
       break;
      case '/renovar_carnet':
        this.currentRouteName = 'Renovacion del carnet';
       break;
      case '/notificacion_user':
        this.currentRouteName = 'Mis notificaciones';
       break;
      default:
        this.currentRouteName = 'Dashboard';
        break;
    }
  }

}
