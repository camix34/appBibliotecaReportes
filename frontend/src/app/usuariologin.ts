import { Rol } from "./rol";

export class Usuariologin {
    id:number;
    username:string;
    password:string;
    isEnabled:boolean;
    accountNoExpired:boolean;
    accountNoLocked:boolean;
    credentialNoExpired:boolean;
    roles: any[] = []; //este atributo no se encuentra en la tabla usuarios sino en otra tabla
}
