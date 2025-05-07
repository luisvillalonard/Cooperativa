import { Urls } from "@hooks/useConstants"
import { useFetch } from "@hooks/useFetch"
import { useReducerHook } from "@hooks/useReducer"
import { Login, UserApp } from "@interfaces/auth"
import { ControlProps, ResponseResult, SessionStorageKeys } from "@interfaces/global"
import { State } from "@reducers/global"
import { createContext, useContext } from "react"

export interface AuthState extends Pick<State<UserApp>, "user" | "procesando" | "showMenu" | "showUserInfo"> { }

export interface AuthContextState<T> {
    state: AuthState,
    validar: (user: Login) => Promise<ResponseResult<T>>,
    LoggedIn: (user: UserApp) => void,
    LoggedOut: () => void,
    openMenu: () => void,
    openUserInfo: () => void,
}

const AuthContext = createContext<AuthContextState<UserApp>>({} as AuthContextState<UserApp>)

const AuthProvider = (props: Pick<ControlProps, "children">) => {

    const { children } = props
    const urlBase = `${Urls.Seguridad.Usuarios}`
    const {
        state,
        dispatchFetching,
        dispatchFetchingComplete,
        dispatchSignIn,
        dispatchSignOut,
        dispatchShowMenu,
        dispatchShowInfoUser
    } = useReducerHook<UserApp>(urlBase);
    const api = useFetch();
    const { showMenu, showUserInfo } = state;

    const validar = async (user: Login): Promise<ResponseResult<UserApp>> => {

        dispatchFetching();
        let resp: ResponseResult<UserApp>;

        try {
            resp = await api.Post<UserApp>(`${urlBase}/${Urls.Seguridad.Validar}`, user);
        } catch (error: unknown) {
            resp = error as ResponseResult<UserApp>;
        }
        dispatchFetchingComplete();
        return resp;
    }

    const LoggedIn = (user: UserApp) => {

        const jsonUser = JSON.stringify(user);
        sessionStorage.setItem(SessionStorageKeys.User, jsonUser)
        dispatchSignIn(user);

    }

    const LoggedOut = () => {

        sessionStorage.removeItem(SessionStorageKeys.User)
        sessionStorage.removeItem(SessionStorageKeys.Token)
        dispatchSignOut();

    }

    const openMenu = () => dispatchShowMenu(!showMenu)

    const openUserInfo = () => dispatchShowInfoUser(!showUserInfo)

    return (
        <AuthContext.Provider value={{
            state,
            validar,
            LoggedIn,
            LoggedOut,
            openMenu,
            openUserInfo,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth = () => {
    return useContext<AuthContextState<UserApp>>(AuthContext)
}

