import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Usuariologin } from '../usuariologin';
import { RestapiService } from '../restapi.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Roles } from '../roles';
import { HttpClient } from '@angular/common/http';
import { PermisosService } from '../permisos.service';
import { RoleServiceService } from '../role-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  standalone: false,
  templateUrl: './agregar-usuarios.component.html',
  styleUrl: './agregar-usuarios.component.css',
 
})
export class AgregarUsuariosComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    private usuariologinservice: RestapiService,
    private route:Router,
    private http : HttpClient,
    private permissionService: PermisosService,
    private roleService : RoleServiceService,
    private userService : UserService,
    private fb: FormBuilder,
    private router : ActivatedRoute

  ){
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
       
    });

  }

    //declarar variables
  showPassword = false;
  username: '';
  password = '';
  id: number;
  idpermiso: number;
  roleEnum: string; // Esto debe coincidir con el backend
  usuariologin: Usuariologin = new Usuariologin();
  roles: any[] = [];
  selectedRoleIds: number[] = []; 
  permissionList: any[] = [];
  selectedPermissionIds: number[] = [];
  selectedPermissions: { id: number; name: string }[] = [];
  carnet: string = ''; //recibimos el input
  idUsuario!: number;

  //mapa para traducir los permisos
  permissionNameMap: { [key: string]: string } = {
    CREATE: 'Agregar',
    READ: 'Leer',
    UPDATE: 'Actualizar',
    DELETE: 'Eliminar'
  };

  //variable para guardar los datos del form
  usuario = {
    username: '',
    password: '',
    isenabled: true,
    accountNoExpired: true,
    accountNolocked: true,
    credentialNoExpired: true ,
     idUsuario: this.idUsuario     // id del usuario a registrar con el carnet
  };
  

  //traemos los roles para usarlos en el select
 ngOnInit(): void {
  
  this.router.queryParams.subscribe(params => {
    console.log('Query params:', params);
    const carnet = params['carnet'];
    const idUsuario = params['idUsuario'];

    if (carnet) {
      // Asignar el carnet al campo username
     this.userForm.get('username')?.setValue(carnet);
    } else {
      console.warn('No se recibió el carnet en los queryParams');
    }

    if (idUsuario) {
    // Puedes almacenarlo en una variable para usarlo al enviar el formulario
    this.idUsuario = Number(idUsuario);  // Asegúrate de convertirlo a número si lo necesitas
  } else {
    console.warn('No se recibió el idUsuario en los queryParams');
  }
  });
  this.http.get<any[]>('http://localhost:8080/user/roles').subscribe(data => {
    this.roles = data;



   
  });

  //sirve para obtener el array de roles y empezar a sacar el permiso y usarlo como unico para que no se repita
  this.roleService.getRoles().subscribe((roles: any[]) => {
    const allPermissions = roles.flatMap(role => role.permissionsList);
    const uniquePermissions = allPermissions.filter(
      (perm, index, self) =>
        index === self.findIndex(p => p.id === perm.id)
    );
    this.permissionList = uniquePermissions;

    console.log('Permisos únicos:', this.permissionList);
  });

 }
togglePassword() {
  this.showPassword = !this.showPassword;

}
irAlDashboard(){
  this.route.navigate(['/home']);
}

irAlaListaUsuarios(){
  this.route.navigate(['/list_users']);
}

//esta funcion retorna los nombres de permisos que selecciona el usuario
get selectedPermissionNames(): string {
  const selected = this.permissionList.filter(p => this.selectedPermissionIds.includes(p.id));
  return selected.length ? selected.map(p=> this.permissionNameMap[p.name] || p.name).join(', ') : 'Ninguno';
}


guardarUsuario(): void {
  console.log(this.userForm.value);
  if (this.userForm.invalid) {
    console.log('Formulario inválido');
    this.userForm.markAllAsTouched();
    return;
  }

  const userData = {
   
    username: this.userForm.value.username,
    password: this.userForm.value.password,
     roles: [this.userForm.value.role],
     idUsuario : this.idUsuario
  };

  console.log('Enviando al backend:', userData);

  Swal.fire({
    title: "¿Deseas guardar los cambios?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar Usuario",
    denyButtonText: `No guardar`
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.registrarUsuario(userData).subscribe({
        next: res => {
          console.log('Usuario registrado con éxito', res);
          this.userForm.reset();  // Limpiamos el formulario correctamente
          Swal.fire("Guardado con éxito!", "", "success");
          this.irAlaListaUsuarios();
        },
        error: err => {
          console.error('Error al registrar usuario', err);
          Swal.fire("Error al guardar", err.error.message || "Error desconocido", "error");
        }
      });
    } else if (result.isDenied) {
      Swal.fire("Cancelado!", "", "info");
    }
  });
}
}
