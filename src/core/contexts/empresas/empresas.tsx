import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Empresa } from "@interfaces/empresas"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const EmpresasContext = createContext<GlobalContextState<Empresa>>({} as GlobalContextState<Empresa>)

export default function EmpresasProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Empresa>(Urls.Empresas.Base);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            rnc: '',
            provincia: undefined,
            municipio: undefined,
            activa: true,
        });
    }

    return (
        <EmpresasContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </EmpresasContext.Provider>
    )
}

export const useEmpresas = () => {
    return useContext<GlobalContextState<Empresa>>(EmpresasContext)
}