import { Usuario } from "./seguridad";

export interface Login {
    acceso: string,
    clave: string,
    recuerdame: boolean
}

export interface UserApp extends Usuario {
    token?: string,
}