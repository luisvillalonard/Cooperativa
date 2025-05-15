import { Urls } from "@hooks/useConstants"
import { useReducerHook } from "@hooks/useReducer"
import { Billete } from "@interfaces/auxiliares"
import { ControlProps } from "@interfaces/global"
import { GlobalContextState } from "@reducers/global"
import { createContext, useContext } from "react"

export interface BilleteContextState<T> extends Pick<GlobalContextState<T>, "state" | "todos"> { }
export const BilletesContext = createContext<BilleteContextState<Billete>>({} as BilleteContextState<Billete>)

export default function BilletesProvider(props: Pick<ControlProps, "children">) {

    const { children } = props
    const { state, todos } = useReducerHook<Billete>(Urls.Auxiliares.Billetes);

    return (
        <BilletesContext.Provider value={{
            state,
            todos,
        }}>
            {children}
        </BilletesContext.Provider>
    )
}

export const useBilletes = () => {
    return useContext<BilleteContextState<Billete>>(BilletesContext)
}