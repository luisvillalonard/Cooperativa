import { Urls } from "@hooks/useConstants"
import { useFetch } from "@hooks/useFetch"
import { useReducerHook } from "@hooks/useReducer"
import { Login, UserApp } from "@interfaces/auth"
import { ControlProps, ResponseResult } from "@interfaces/global"
import { CambioClave, Usuario } from "@interfaces/seguridad"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export interface UsuariosContextState<T> extends GlobalContextState<T> {
    nuevo: () => void,
    validar: (item: Login) => Promise<ResponseResult<UserApp>>,
    cambiarClave: (item: CambioClave) => Promise<ResponseResult<UserApp>>,
}

export const UsuariosContext = createContext<UsuariosContextState<Usuario>>({} as UsuariosContextState<Usuario>)

export default function UsuariosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const urlBase = Urls.Seguridad.Usuarios
    const urlValidar = `${urlBase}/validar`
    const urlCambiarClave = `${urlBase}/cambioClave`
    const {
        state,
        editar,
        cancelar,
        agregar,
        actualizar,
        todos,
        errorResult,
        dispatchFetching,
        dispatchFetchingComplete,
    } = useReducerHook<Usuario>(urlBase);
    const api = useFetch();

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            acceso: '',
            codigo: '',
            rol: undefined,
            empresa: undefined,
            cambio: false,
            activo: false
        });
    }

    const cambiarClave = async (item: CambioClave): Promise<ResponseResult<UserApp>> => {

        dispatchFetching();
        let resp: ResponseResult<UserApp>;

        try {
            resp = await api.Post<UserApp>(`${urlCambiarClave}`, item);
        } catch (error: any) {
            resp = errorResult<UserApp>(error);
        }

        dispatchFetchingComplete();
        return resp;
    }

    const validar = async (item: Login): Promise<ResponseResult<UserApp>> => {

        dispatchFetching();
        let resp: ResponseResult<UserApp>;

        try {
            resp = await api.Post<UserApp>(urlValidar, item);
        } catch (error: any) {
            resp = errorResult<UserApp>(error);
        }

        dispatchFetchingComplete();
        return resp;
    }

    return (
        <UsuariosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
            validar,
            cambiarClave,
        }}>
            {children}
        </UsuariosContext.Provider>
    )
}

export const useUsuarios = () => {
    return useContext<UsuariosContextState<Usuario>>(UsuariosContext)
}