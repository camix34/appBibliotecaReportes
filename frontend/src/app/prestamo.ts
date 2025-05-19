import { UsuarioBiblio } from "./usuario-biblio";

export class Prestamo {
    id_Prestamo: number;
    id_usuario: number;
    materialEntity:any;
    fecha_prestamo: Date;
    fecha_devolucion: Date;
    FECHA_DEVOLUCION_REAL:Date;

     usuario: UsuarioBiblio;

}
