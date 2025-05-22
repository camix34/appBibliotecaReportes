import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';
import { ActualizarEstudiante } from '../dto/actualizar-estudiante';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioBiblio } from '../usuario-biblio';
import Swal from 'sweetalert2';
import { ActualizarBibliotecario } from '../dto/actualizar-bibliotecario';
import { ActualizarDocente } from '../dto/actualizar-docente';

@Component({
  selector: 'app-actualizar-usuario-biblio',
  standalone: false,
  templateUrl: './actualizar-usuario-biblio.component.html',
  styleUrl: './actualizar-usuario-biblio.component.css'
})
export class ActualizarUsuarioBiblioComponent implements OnInit{

  formularioUpdate:FormGroup;
  usuario: UsuarioBiblio;
  carreras: any[] = [];
  facultades: any[] = [];
  idUsuario: number;
  carrerasFiltradas: any[] = [];
  nombreCarrera: string = '';
  idusuario:number;
  nombre: string ='';//variable que recibe el nombre del listado
  carnet: string ='';//variable que recibe del carnet del listado
  apellido1: string='';
  apellido2: string='';
  email: string='';
  telefono:string='';
  tipo:string='';
  direccion:string='';
  fecha_registro:string='';
  roles: any[];
  carrera: any[] = [];
  facultad:any[];
  contrato_id: any[] = [];// para almacenar los tipo de contratos
  dui: string;
  area:string;
  especialidades: any[]=[];
  tipoUsuario: 'ESTUDIANTE' | 'BIBLIOTECARIO' = 'ESTUDIANTE'; 
  especialidad: any[];
   datosUpdateUsuario = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    telefono: '',
    tipo: '',
    direccion: '',
    
   
    // otros campos...
  };

  
  constructor(private fb:FormBuilder, private usuariobiblioservice:UsuarioBiblioService, private router:ActivatedRoute,private route: Router){
       this.formularioUpdate = this.fb.group({
      idusuario: [null, Validators.required],
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      idCarrera: [null, Validators.required],
      idFacultad: [null, Validators.required],
      dui:['',Validators.required],
      area: ['',Validators.required],
      especialidad_id:['',Validators.required]
    });
  }
  ngOnInit(): void {
          const idUsuario = +this.router.snapshot.paramMap.get('id')!;
        this.tipo = this.router.snapshot.queryParamMap.get('tipo') as 'ESTUDIANTE' | 'BIBLIOTECARIO';

        // 👉 APLICA las validaciones ya con `this.tipo` definido
        if (this.tipo === 'ESTUDIANTE') {
          this.formularioUpdate.get('idCarrera')?.setValidators(Validators.required);
          this.formularioUpdate.get('idFacultad')?.setValidators(Validators.required);
          this.formularioUpdate.get('dui')?.clearValidators();
          this.formularioUpdate.get('area')?.clearValidators();
          this.formularioUpdate.get('especialidad_id')?.clearValidators();
        } else if (this.tipo === 'BIBLIOTECARIO') {
          this.formularioUpdate.get('dui')?.setValidators(Validators.required);
          this.formularioUpdate.get('area')?.setValidators(Validators.required);
          this.formularioUpdate.get('idCarrera')?.clearValidators();
          this.formularioUpdate.get('idFacultad')?.clearValidators();
          this.formularioUpdate.get('especialidad_id')?.clearValidators();
        }else if(this.tipo==='DOCENTE'){
            this.formularioUpdate.get('dui')?.setValidators(Validators.required);
            this.formularioUpdate.get('especialidad_id')?.setValidators(Validators.required);
            this.formularioUpdate.get('idFacultad')?.setValidators(Validators.required);

            this.formularioUpdate.get('idCarrera')?.clearValidators();
            this.formularioUpdate.get('area')?.clearValidators();
        }   

        // Actualiza la validez
        ['idCarrera', 'idFacultad', 'dui', 'area','especialidad_id'].forEach(campo =>
          this.formularioUpdate.get(campo)?.updateValueAndValidity()
        );

        // Carga datos según tipo
        if (this.tipo === 'ESTUDIANTE') {
          this.usuariobiblioservice.obtenerFacultad().subscribe(facultades => {
            this.facultades = facultades;

            this.usuariobiblioservice.obtenerCarreras().subscribe(carreras => {
              this.carreras = carreras;

              this.usuariobiblioservice.obtenerEstudiante(idUsuario).subscribe(data => {
                this.formularioUpdate.patchValue({
                  idusuario: data.idusuario,
                  nombre: data.nombre,
                  apellido1: data.apellido1,
                  apellido2: data.apellido2,
                  email: data.email,
                  telefono: data.telefono,
                  direccion: data.direccion,
                  idCarrera: data.idCarrera,
                  idFacultad: data.idFacultad
                });
              });
            });
          });
        } else if (this.tipo === 'BIBLIOTECARIO') {
          this.usuariobiblioservice.obtenerbibliotecario(idUsuario).subscribe(data => {
            this.formularioUpdate.patchValue({
              idusuario: data.idusuario,
              nombre: data.nombre,
              apellido1: data.apellido1,
              apellido2: data.apellido2,
              email: data.email,
              telefono: data.telefono,
              direccion: data.direccion,
              dui: data.dui,
              area: data.area
            });
          });

         
        }else if(this.tipo === 'DOCENTE'){

          this.usuariobiblioservice.obtenerFacultad().subscribe(facultades => {
            this.facultades = facultades;

          this.usuariobiblioservice.obtenerEspecialidad().subscribe(especialidades => {
            this.especialidades = especialidades;
            
             this.usuariobiblioservice.obtenerDocente(idUsuario).subscribe(data=> {
             this.formularioUpdate.patchValue({
              idusuario: data.idusuario,
              nombre: data.nombre,
              apellido1: data.apellido1,
              apellido2: data.apellido2,
              email: data.email,
              telefono: data.telefono,
              direccion: data.direccion,
              dui: data.dui,
              idFacultad: data.idFacultad,
              especialidad_id: data.especialidad_id
               });
             });
            });
          });
         
        }
    
   
  }
  

    onSubmit(): void {
      console.log("Tipo actual:", this.tipo);
      console.log("Formulario enviado con el id:", this.formularioUpdate.value.idusuario);
  if (!this.formularioUpdate.valid) {
  this.formularioUpdate.markAllAsTouched(); // 🔧 marca los campos como tocados (para mostrar errores en el HTML)

  // 🔍 Muestra los campos con errores en la consola
  Object.entries(this.formularioUpdate.controls).forEach(([campo, control]) => {
    if (control.invalid) {
      console.warn(`Campo inválido: ${campo}`, control.errors);
    }
  });

  Swal.fire("Formulario inválido", "Por favor completa los campos requeridos", "warning");
  return;
  }

  Swal.fire({
    title: "¿Deseas actualizar el usuario?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Actualizar Usuario",
    denyButtonText: `No guardar`
  }).then((result) => {
    if (result.isConfirmed) {
      if (this.tipo === 'ESTUDIANTE') {
        const dto: ActualizarEstudiante = {
           idusuario: this.formularioUpdate.value.idusuario,  // Asegura que el idusuario esté correctamente asignado
            nombre: this.formularioUpdate.value.nombre,
            apellido1: this.formularioUpdate.value.apellido1,
            apellido2: this.formularioUpdate.value.apellido2,
            email: this.formularioUpdate.value.email,
            telefono: this.formularioUpdate.value.telefono,
            direccion: this.formularioUpdate.value.direccion,
            idCarrera: this.formularioUpdate.value.idCarrera,
            idFacultad: this.formularioUpdate.value.idFacultad
        };

        this.usuariobiblioservice.actualizarUsuarioEstudiante(dto).subscribe({
          next: res => {
            Swal.fire("¡Estudiante actualizado con éxito!", "", "success");
            this.irAlaListaUsuarios();
          },
          error: err => {
            console.error('Error al actualizar estudiante', err);
            Swal.fire("Error al guardar", err.error.message || "Error desconocido", "error");
          }
        });

      } else if (this.tipo === 'BIBLIOTECARIO') {
        const dto: ActualizarBibliotecario = {
            idusuario: this.formularioUpdate.value.idusuario,  // Asegura que el idusuario esté correctamente asignado
            nombre: this.formularioUpdate.value.nombre,
            apellido1: this.formularioUpdate.value.apellido1,
            apellido2: this.formularioUpdate.value.apellido2,
            email: this.formularioUpdate.value.email,
            telefono: this.formularioUpdate.value.telefono,
            direccion: this.formularioUpdate.value.direccion,
            dui: this.formularioUpdate.value.dui,
            area: this.formularioUpdate.value.area
        };

        this.usuariobiblioservice.actualizarBibliotecario(dto).subscribe({
          next: res => {
            Swal.fire("¡Bibliotecario actualizado con éxito!", "", "success");
            this.irAlaListaUsuarios();
          },
          error: err => {
            console.error('Error al actualizar bibliotecario', err);
            Swal.fire("Error al guardar", err.error.message || "Error desconocido", "error");
          }
        });
      } else if (this.tipo === 'DOCENTE') {
        const dto: ActualizarDocente = {
            idusuario: this.formularioUpdate.value.idusuario,  // Asegura que el idusuario esté correctamente asignado
            nombre: this.formularioUpdate.value.nombre,
            apellido1: this.formularioUpdate.value.apellido1,
            apellido2: this.formularioUpdate.value.apellido2,
            email: this.formularioUpdate.value.email,
            telefono: this.formularioUpdate.value.telefono,
            direccion: this.formularioUpdate.value.direccion,
            dui: this.formularioUpdate.value.dui,
            especialidad_id: this.formularioUpdate.value.especialidad_id,
            idFacultad: this.formularioUpdate.value.idFacultad
        };

        this.usuariobiblioservice.actualizarDocente(dto).subscribe({
          next: res => {
            Swal.fire("¡Docente actualizado con éxito!", "", "success");
            this.irAlaListaUsuarios();
          },
          error: err => {
            console.error('Error al actualizar docente', err);
            Swal.fire("Error al guardar", err.error.message || "Error desconocido", "error");
          }
        });
      } 

    } else if (result.isDenied) {
      Swal.fire("Cambios descartados", "", "info");
    }
  });
  }
  irAlaListaUsuarios(){
    this.route.navigate(['/list_users']);
  }

  cargarCarrerasDeFacultad(facultadId: number): void {
  if (facultadId) {
    this.carrerasFiltradas = this.carreras.filter(carrera => carrera.facultad.id === facultadId);
    // Si el usuario tiene una carrera asignada, se asegura de que esté seleccionada.
    this.formularioUpdate.patchValue({
      idCarrera: this.carrerasFiltradas.find(carrera => carrera.id === this.formularioUpdate.value.idCarrera)?.id
    });
  }
}
 
}
