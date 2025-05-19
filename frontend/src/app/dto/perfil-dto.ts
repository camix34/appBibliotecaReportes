export interface PerfilDTO {

  idusuario?: number;
  carnet?: string;
  nombre?: string;
  apellido1: string;
  apellido2: string;
  email: string;
  telefono: string;
  tipo: string;
  direccion: string;
  username: string;
  fecharegistro:Date;

  // Campos opcionales según el tipo
  carrera?: number;
  facultad?: number;
  nombreCarrera:string;
  departamento?: number;
  especialidad?: number;
  dui?: string;
  area?: string;
}
