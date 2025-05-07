export interface Empresa {
    id: 1,
    nombre: string,
    rnc: string,
    direccion: string,
    telefono: string,
    correo: string,
    activa: boolean,
}

export interface Empleado {
    id: number,
    nombre: string,
    cedula: string,
    correo: string,
    horario: Horario | undefined,
    posicion: Posicion | undefined,
    salario: number,
    activo: false
}

export interface Posicion {
    id: number,
    nombre: string,
    descripcion: string,
    sueldo: number,
    activa: boolean
}

export interface Horario {
    id: number,
    nombre: string,
    horaInicio: string,
    horaFin: string,
    activo: true
}