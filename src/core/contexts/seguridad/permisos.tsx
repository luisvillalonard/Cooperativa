import { Urls } from "@hooks/useConstants"
import { useFetch } from "@hooks/useFetch"
import { useReducerHook } from "@hooks/useReducer"
import { ControlProps, ResponseResult } from "@interfaces/global"
import { Menu, Rol } from "@interfaces/seguridad"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export interface PermisosContextState<T> extends GlobalContextState<T> {
    getByRolId: (rolId: number) => Promise<ResponseResult<T>>,
    roles: () => Promise<ResponseResult<T[]>>,
    menus: () => Promise<ResponseResult<Menu[]>>,
}

export const PermisosContext = createContext<PermisosContextState<Rol>>({} as PermisosContextState<Rol>)

export default function PermisosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const urlBase = Urls.Seguridad.Permisos
    const urlRolPorId = `${urlBase}/rolId`
    const urlRoles = `${urlBase}/roles`
    const urlMenus = `${urlBase}/menus`
    const { state, dispatchFetching, dispatchFetchingComplete, editar, cancelar, agregar, actualizar, todos, errorResult } = useReducerHook<Rol>(urlBase);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            esAdmin: false,
            activo: true,
            permisos: [],
        });
    }

    const getByRolId = async (rolId: number): Promise<ResponseResult<Rol>> => {

        dispatchFetching();
        let resp: ResponseResult<Rol>;

        try {
            resp = await api.Get<Rol>(`${urlRolPorId}?rolId=${rolId}`);
        } catch (error: any) {
            resp = errorResult<Rol>(error);
        }

        dispatchFetchingComplete();
        return resp;
    }

    const roles = async (): Promise<ResponseResult<Rol[]>> => {

        dispatchFetching();
        let resp: ResponseResult<Rol[]>;

        try {
            resp = await api.Get<Rol[]>(urlRoles);
        } catch (error: any) {
            resp = errorResult<Rol[]>(error);
        }

        dispatchFetchingComplete();
        return resp;
    }

    const menus = async (): Promise<ResponseResult<Menu[]>> => {

        dispatchFetching();
        let resp: ResponseResult<Menu[]>;

        try {
            resp = await api.Get<Menu[]>(urlMenus);
        } catch (error: any) {
            resp = errorResult<[]>(error);
        }

        dispatchFetchingComplete();
        return resp;
    }

    return (
        <PermisosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            getByRolId,
            roles,
            menus,
        }}>
            {children}
        </PermisosContext.Provider>
    )
}

export const usePermisos = () => {
    return useContext<PermisosContextState<Rol>>(PermisosContext)
}