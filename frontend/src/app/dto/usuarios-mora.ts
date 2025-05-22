import { MultaDto } from "./multa-dto";

export interface UsuariosMora {

      idUsuario: number;
  idMulta: number;
  estadoPenalizacion: number;
  fechaRegistro: string;
  fechaFin: string | null;
  multa: MultaDto;

}
