import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioBiblioService } from '../services/usuario-biblio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario-biblio',
  standalone: false,
  templateUrl: './agregar-usuario-biblio.component.html',
  styleUrl: './agregar-usuario-biblio.component.css'
})
export class AgregarUsuarioBiblioComponent implements OnInit {
    formularioRegistro: FormGroup;

    datosUsuario = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    telefono: '',
    tipo: '',
    direccion: '',
    contrato_id: '',
    dui: ''
    // otros campos...
  };

  carreras: any[] = [];  // Para almacenar la lista de carreras
  facultades: any[] = []; // Para almacenar la lista de facultades
  contrato_id: any[] = [];// para almacenar los tipo de contratos
  especialidades: any[]=[];
  dui: string;
  area:string;
  constructor(
    private router:Router,
    private usuarioServiceBiblio: UsuarioBiblioService,
    private fb: FormBuilder
  ){
      this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      tipo: ['', Validators.required],
      carreraId: ['',Validators.required],
      facultadId:['', Validators.required],
      direccion: [''],

      //datos del bibliotecario requeridos
      contrato_id:['',Validators.required],
      area:['',Validators.required],
     dui: ['', Validators.required],

      //datos del docente
      especialidad:['',Validators.required],
    });

    
  
  }

  ngOnInit(): void {
this.formularioRegistro.get('tipo')?.valueChanges.subscribe((valor) => {
    // 1. Cargar datos dinámicos según el tipo
    if (valor === 'ESTUDIANTE') {
      this.usuarioServiceBiblio.obtenerCarreras().subscribe({
        next: (carreras) => this.carreras = carreras,
        error: (err) => console.error('Error al obtener las carreras:', err)
      });

      this.usuarioServiceBiblio.obtenerFacultad().subscribe({
        next: (facultades) => this.facultades = facultades,
        error: (err) => console.error('Error al obtener las facultades:', err)
      });

      this.contrato_id = []; // Limpiar contratos si cambia a estudiante
      this.especialidades=[];
      
    } else if (valor === 'BIBLIOTECARIO') {
      this.carreras = [];
      this.facultades = [];

      this.usuarioServiceBiblio.obtenerTipoContrato().subscribe({
        next: (contratos) => this.contrato_id = contratos,
        error: (err) => console.error('Error al obtener contratos:', err)
      });
    }else if(valor ==='DOCENTE'){
        this.carreras=[];

      this.usuarioServiceBiblio.obtenerTipoContrato().subscribe({
        next: (contratos) => this.contrato_id = contratos,
        error: (err) => console.error('Error al obtener contratos:', err)
      });

       this.usuarioServiceBiblio.obtenerFacultad().subscribe({
        next: (facultades) => this.facultades = facultades,
        error: (err) => console.error('Error al obtener las facultades:', err)
      });
       this.usuarioServiceBiblio.obtenerEspecialidad().subscribe({
       next: (especialidades) => {
          this.especialidades = especialidades;
          console.log('Especialidades cargadas:', this.especialidades); // Verifica que las especialidades se cargan
        },
        error: (err) => console.error('Error al obtener especialidades:', err)
      });
    } 
    else {
      // Si no es ninguno (tipo vacío)
      this.carreras = [];
      this.facultades = [];
      this.contrato_id = [];
      this.especialidades=[];
    }

    // 2. Ajustar validadores dinámicamente
    if (valor === 'BIBLIOTECARIO') {
      this.formularioRegistro.get('carreraId')?.clearValidators();
      this.formularioRegistro.get('facultadId')?.clearValidators();
       this.formularioRegistro.get('especialidad')?.clearValidators();

      this.formularioRegistro.get('contrato_id')?.setValidators(Validators.required);
      this.formularioRegistro.get('area')?.setValidators(Validators.required);
      this.formularioRegistro.get('dui')?.setValidators(Validators.required);
    } else if (valor === 'ESTUDIANTE') {
      this.formularioRegistro.get('contrato_id')?.clearValidators();
      this.formularioRegistro.get('area')?.clearValidators();
      this.formularioRegistro.get('dui')?.clearValidators();
       this.formularioRegistro.get('especialidad')?.clearValidators();

      this.formularioRegistro.get('carreraId')?.setValidators(Validators.required);
      this.formularioRegistro.get('facultadId')?.setValidators(Validators.required);
    }else if(valor === 'DOCENTE'){
       this.formularioRegistro.get('carreraId')?.clearValidators();
       this.formularioRegistro.get('area')?.clearValidators();

      this.formularioRegistro.get('facultadId')?.setValidators(Validators.required);
      this.formularioRegistro.get('contrato_id')?.setValidators(Validators.required);
      this.formularioRegistro.get('especialidad')?.setValidators(Validators.required);
      this.formularioRegistro.get('dui')?.setValidators(Validators.required);
    }

    // 3. ¡Actualizar validadores!
    this.formularioRegistro.get('carreraId')?.updateValueAndValidity();
    this.formularioRegistro.get('facultadId')?.updateValueAndValidity();
    this.formularioRegistro.get('contrato_id')?.updateValueAndValidity();
    this.formularioRegistro.get('area')?.updateValueAndValidity();
    this.formularioRegistro.get('dui')?.updateValueAndValidity();
    this.formularioRegistro.get('especialidad')?.updateValueAndValidity();
  });

  // ⚠️ Forzar validación inicial si ya hay valor
  const tipoInicial = this.formularioRegistro.get('tipo')?.value;
  if (tipoInicial) {
    this.formularioRegistro.get('tipo')?.setValue(tipoInicial);
  }

  
}
  

  enviarFormulario() {
    console.log("formualrio invalido desde: ",this.formularioRegistro.value)
  if (this.formularioRegistro.valid) {
    const datosUsuario = this.formularioRegistro.value;

    // Limpiar campos según el tipo de usuario
    if (datosUsuario.tipo === 'BIBLIOTECARIO') {
      datosUsuario.carreraId = null;
      datosUsuario.facultadId = null;
      datosUsuario.especialidad = null;
    } else if (datosUsuario.tipo === 'ESTUDIANTE') {
      datosUsuario.contrato_id = null;
      datosUsuario.dui = null;
      datosUsuario.area= null;
      datosUsuario.especialidad = null;

      // Asegurar conversión a número
      datosUsuario.carreraId = +datosUsuario.carreraId;
      datosUsuario.facultadId = +datosUsuario.facultadId;
    }else if(datosUsuario.tipo === 'DOCENTE'){
      datosUsuario.area=null;
      datosUsuario.carreraId = null;
     
       datosUsuario.facultadId = +datosUsuario.facultadId;
       datosUsuario.especialidad = +datosUsuario.especialidad;
         // ⬇️ AQUI PONEMOS EL LOG
      console.log('Valor de especialidad seleccionado:', datosUsuario.especialidad);
       
    }

    console.log('Datos enviados al backend:', JSON.stringify(datosUsuario, null, 2));

    this.usuarioServiceBiblio.crearUsuarioBiblio(datosUsuario).subscribe({
      next: (respuesta) => {
        const carnet = respuesta.carnet;
        const idUsuario = respuesta.idUsuario;

        this.router.navigate(['/add_user'], { queryParams: { carnet, idUsuario } });
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
      }
    });
  } else {
    console.warn('Formulario inválido');
    this.formularioRegistro.markAllAsTouched(); // Para que se muestren errores en el HTML
  }
  }

}
