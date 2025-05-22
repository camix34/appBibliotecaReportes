import { Prestamo } from "../prestamo";

export interface MultaDto {

  idPrestamo: number;
  fechaDevolucion: Date; 
  fechaPrestamo:Date;
  fechaDevolucionReal: Date | null;
  estaRetrasado: boolean;
  tieneMulta: boolean;
  penalizado: boolean;
  tituloMaterial: string | null;
  monto: number;
  diasRetraso: number; //esta variable se usa en usuarios mora
  dias_retraso:number; //esta variable solo se en devolverprestamo.html
  idusuario:number;
    prestamo: Prestamo;

}
