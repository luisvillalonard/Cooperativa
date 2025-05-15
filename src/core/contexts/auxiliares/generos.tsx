import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Genero } from "@interfaces/auxiliares"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export interface GeneroContextState<T> extends Pick<GlobalContextState<T>, "state" | "todos"> { }
export const GenerosContext = createContext<GeneroContextState<Genero>>({} as GeneroContextState<Genero>)

export default function GenerosProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, todos } = useReducerHook<Genero>(Urls.Auxiliares.Generos);

    return (
        <GenerosContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </GenerosContext.Provider>
    )
}

export const useGeneros = () => {
    return useContext<GeneroContextState<Genero>>(GenerosContext)
}