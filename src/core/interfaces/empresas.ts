import { Genero } from "./auxiliares"

export interface Empresa {
    id: number,
    nombre: string,
    rnc: string,
    direccion?: string,
    provinciaId: number,
    municipioId: number,
    telefono?: string,
    webSite?: string,
    correo?: string,
    fax?: string,
    logoId?: number,
    activa: boolean,
}

export interface Sucursal extends Empresa {
    empresa: Empresa | undefined,
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