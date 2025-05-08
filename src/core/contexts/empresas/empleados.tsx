import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Empleado } from "@interfaces/empresas"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export const EmpleadosContext = createContext<GlobalContextState<Empleado>>({} as GlobalContextState<Empleado>)

export default function EmpleadosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, editar, cancelar, agregar, actualizar, todos } = useReducerHook<Empleado>(Urls.Empresas.Empleados);

    const nuevo = async (): Promise<void> => {
        editar({
            id: 0,
            nombre: '',
            genero: undefined,
            horario: undefined,
            empresa: undefined,
            salario: 0,
            activo: true,
        });
    }

    return (
        <EmpleadosContext.Provider value={{
            state,
            nuevo,
            editar,
            cancelar,
            agregar,
            actualizar,
            todos,
        }}>
            {children}
        </EmpleadosContext.Provider>
    )
}

export const useEmpleados = () => {
    return useContext<GlobalContextState<Empleado>>(EmpleadosContext)
}