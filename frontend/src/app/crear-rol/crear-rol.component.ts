import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Permisos } from '../permisos';
import { RoleServiceService } from '../role-service.service';

@Component({
  selector: 'app-crear-rol',
  standalone: false,
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.css'
})
export class CrearRolComponent {

   permisos: Permisos[] = [];
   form: FormGroup;

  constructor(private rolesService: RoleServiceService, private fb: FormBuilder){
     this.form = this.fb.group({
      roleEnum: [''],
      permisoIds: this.fb.array([])
    });
  }

  ngOnInit():void{
     this.rolesService.getPermisos().subscribe(data => {
      this.permisos = data;
      console.log("estos permisos",this.permisos);  
    });
  }

    onCheckboxChange(event: any) {
    const permisoIds = this.form.get('permisoIds') as FormArray;
    if (event.target.checked) {
      permisoIds.push(this.fb.control(event.target.value));
    } else {
      const index = permisoIds.controls.findIndex(x => x.value == event.target.value);
      permisoIds.removeAt(index);
    }
  }

  submit() {
    this.rolesService.crearRol(this.form.value).subscribe(() => {
      alert("Rol creado con éxito");
    });
  }
}
