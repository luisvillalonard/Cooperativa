import { Genero } from "./auxiliares";
import { Municipio, Provincia } from "./configuraciones";

export interface Empresa {
    id: number,
    nombre: string,
    rnc: string,
    direccion?: string,
    provincia: Provincia | undefined,
    municipio: Municipio | undefined,
    telefono?: string,
    webSite?: string,
    correo?: string,
    fax?: string,
    logoId?: number,
    activa: boolean,
}

export interface Empleado {
    id: number,
    nombre: string,
    genero: Genero | undefined,
    cedula?: string,
    correo?: string,
    horario: Horario | undefined,
    posicion?: Posicion,
    empresa: Empresa | undefined,
    salario: number,
    activo: boolean,
    fotoId?: number,
    fechaEntrada?: string,
    fechaSalida?: string,
}

export interface Posicion {
    id: number,
    nombre: string,
    descripcion?: string,
    sueldo: number,
    activa: boolean
}

export interface Horario {
    id: number,
    nombre: string,
    horaInicio: string,
    horaFin: string,
    activo: boolean,
}