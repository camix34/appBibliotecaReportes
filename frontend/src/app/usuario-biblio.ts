export class UsuarioBiblio {

    idusuario:number;
    nombre:string;
    carnet:string;
    apellido1:string;
    apellido2:string;
    email:string;
    telefono: string;
    tipo: string;
    direccion: string;
    fecha_registro: Date;
    fechafin: Date;
    fechainicio: Date;
   
   idCarrera: number;
   idFacultad: number;

   carrera: { id: number; nombre: string } | null = null;
   facultad: { id: number; nombre: string } | null = null;
   dui:string;
  area:string;

     roles: any[] = [];// Asegúrate de que 'roles' esté definido como un array
}
