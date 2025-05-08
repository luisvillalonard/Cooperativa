export interface Pais {
    id: Number,
    nombre: string,
    principal: boolean,
}

export interface Provincia {
    id: Number,
    nombre: string,
    paisId: Number,
}

export interface Municipio {
    id: Number,
    nombre: string,
    provinciaId: Number,
}