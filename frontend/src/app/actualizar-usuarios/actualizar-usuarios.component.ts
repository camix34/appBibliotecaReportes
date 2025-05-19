import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuarios',
  standalone: false,
  templateUrl: './actualizar-usuarios.component.html',
  styleUrl: './actualizar-usuarios.component.css'
})


export class ActualizarUsuariosComponent {
      usuarioForm: FormGroup;
      idUsuario!: number; // para almacenar el ID
      roles: any[] = [];
      datos: any = {
        roleEnum: ''
      };
      showPassword = false;

      
  constructor(private usuarioService: UserService, private fb: FormBuilder, private route:ActivatedRoute,private router: Router) {
    this.router = router;
    this.usuarioForm = this.fb.group({
      
      nombre: [''],
      password: [''], // opcional
      isEnabled: [true],
      accountNoExpired: [true],
      accountNoLocked: [true],
      credentialNoExpired: [true],
      roleEnum: ['']
    });
  }

  

   ngOnInit(): void {
    const idUsuario = +this.route.snapshot.paramMap.get('id')!;

  // 1. Cargar roles desde la BD
  this.usuarioService.getRoles().subscribe(roles => {
    this.roles = roles;

    // 2. Luego de cargar roles, obtener usuario
    this.usuarioService.obtenerUsuarioLoginID(idUsuario).subscribe(usuario => {
      this.usuarioForm.patchValue({
         nombre: usuario.username,
         password: usuario.password,
         isEnabled: usuario.isEnabled,
         accountNoExpired: usuario.accountNoExpired,
         accountNoLocked: usuario.accountNoLocked,
         credentialNoExpired: usuario.credentialNoExpired,
         roleEnum: usuario.roles[0]?.roleEnum
      });
    });
  });
  }

  onSubmit(): void {
   const idUsuario = +this.route.snapshot.paramMap.get('id')!;
  const datos = this.usuarioForm.value;

  const usuarioActualizado = {
      id: idUsuario,
    username: datos.nombre,
    password: datos.password, // si también se edita
    isEnabled: datos.isEnabled,
    accountNoExpired: datos.accountNoExpired,
    accountNoLocked: datos.accountNoLocked,
    credentialNoExpired: datos.credentialNoExpired,
      roles: [{ roleEnum: datos.roleEnum }]  
  };

  Swal.fire({
      title: "¿Deseas actualizar el usuario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar Usuario",
      denyButtonText: `No guardar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.actualizarUsuario(idUsuario,usuarioActualizado).subscribe({
          next: res => {
           
             // Limpiamos el formulario correctamente
            Swal.fire("Usuario " +usuarioActualizado.username+" actualizado con éxito!", "", "success");
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
//metodo para ver la contraseña
togglePassword() {
  this.showPassword = !this.showPassword;

  }
  irAlaListaUsuarios(){
    this.router.navigate(['/list_users']);
  }
}
