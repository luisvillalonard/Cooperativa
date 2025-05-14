import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Horario } from "@interfaces/empresas"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const HorariosContext = createContext<GlobalContextState<Horario>>({} as GlobalContextState<Horario>)

export default function HorariosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Horario>(Urls.Empresas.Horarios);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            horaInicio: '',
            horaFin: '',
            activo: false
        });
    }

    return (
        <HorariosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </HorariosContext.Provider>
    )
}

export const useHorarios = () => {
    return useContext<GlobalContextState<Horario>>(HorariosContext)
}