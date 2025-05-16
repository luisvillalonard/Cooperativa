import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Municipio } from "@interfaces/configuraciones"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const MunicipiosContext = createContext<GlobalContextState<Municipio>>({} as GlobalContextState<Municipio>)

export default function MunicipiosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Municipio>(Urls.Configuraciones.Municipios);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            provincia: undefined,
        });
    }

    return (
        <MunicipiosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </MunicipiosContext.Provider>
    )
}

export const useMunicipios = () => {
    return useContext<GlobalContextState<Municipio>>(MunicipiosContext)
}