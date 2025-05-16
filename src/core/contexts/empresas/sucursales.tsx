import { useReducerHook } from "@hooks/useReducer"
import { Sucursal } from "@interfaces/empresas"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const SucursalesContext = createContext<GlobalContextState<Sucursal>>({} as GlobalContextState<Sucursal>)

export default function SucursalesProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Sucursal>('sucursales');

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            rnc: '',
            provincia: undefined,
            municipio: undefined,
            empresa: undefined,
            activa: true,
        });
    }

    return (
        <SucursalesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </SucursalesContext.Provider>
    )
}

export const useSucursales = () => {
    return useContext<GlobalContextState<Sucursal>>(SucursalesContext)
}