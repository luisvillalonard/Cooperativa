import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Posicion } from "@interfaces/empresas"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const PosicionesContext = createContext<GlobalContextState<Posicion>>({} as GlobalContextState<Posicion>)

export default function PosicionesProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Posicion>(Urls.Empresas.Posiciones);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            sueldo: 0,
            activa: false
        });
    }

    return (
        <PosicionesContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </PosicionesContext.Provider>
    )
}

export const usePosiciones = () => {
    return useContext<GlobalContextState<Posicion>>(PosicionesContext)
}