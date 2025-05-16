import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Provincia } from "@interfaces/configuraciones"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const ProvinciasContext = createContext<GlobalContextState<Provincia>>({} as GlobalContextState<Provincia>)

export default function ProvinciasProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Provincia>(Urls.Configuraciones.Provincias);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            pais: undefined
        });
    }

    return (
        <ProvinciasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </ProvinciasContext.Provider>
    )
}

export const useProvincias = () => {
    return useContext<GlobalContextState<Provincia>>(ProvinciasContext)
}