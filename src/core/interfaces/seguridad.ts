import { Empleado, Empresa } from "./empresas";

export interface Menu {
    id: number,
    titulo: string,
    link: string | null,
    padre: number,
    orden: number,
    icono?: JSX.Element,
}

export interface MenuItem {
    menuid: number,
    key: string,
    label: string | React.ReactNode,
    icon?: React.ReactNode,
    children?: MenuItem[],
    element?: JSX.Element
}

export interface Rol {
    id: number,
    nombre: string,
    descripcion?: string,
    esAdmin: boolean,
    activo: boolean,
    permisos: Permiso[],
}

export interface Permiso {
    id: number,
    rolId: number,
    menuId: number,
}

export interface Usuario {
    id: number,
    acceso: string,
    empleado?: Empleado | undefined,
    rol: Rol | undefined,
    empresa: Empresa | undefined;
    cambio: boolean,
    activo: boolean
}

export interface CambioClave {
    id: number,
    passwordNew: string,
    passwordConfirm: string,
}