export interface Pais {
    id: number,
    nombre: string,
    principal: boolean,
}

export interface Provincia {
    id: number,
    nombre: string,
    pais: Pais | undefined,
}

export interface Municipio {
    id: number,
    nombre: string,
    provincia: Provincia | undefined,
}