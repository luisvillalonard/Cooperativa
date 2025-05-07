import { ResponseResult } from "@interfaces/global";
import { Reducer, useReducer } from "react";
import reducer, { Actions, ActionTypes, initState, State } from "../reducers/global";
import { useFetch } from "./useFetch";

export function useReducerHook<T extends unknown>(urlBase: string) {
    
    const [state, dispatch] = useReducer<Reducer<State<T>, ActionTypes<T>>>(reducer, initState<T>());
    const api = useFetch();

    const dispatchFetching = () => dispatch({ type: Actions.FETCHING });
    const dispatchFetchingComplete = () => dispatch({ type: Actions.FETCH_COMPLETE });
    const dispatchEditing = (model?: T) => dispatch({ type: Actions.EDITING, model: model });
    const dispatchCancel = () => dispatch({ type: Actions.CANCEL });
    const dispatchReload = (reload: boolean) => dispatch({ type: Actions.RELOAD, recargar: reload });
    const dispatchSetData = (resp: ResponseResult<T[]>) => dispatch({
        type: Actions.SET_DATA,
        data: resp.datos ?? Array<T>(),
        paginacion: resp.paginacion
    });
    const dispatchSignIn = (user: T) => dispatch({ type: Actions.SIGN_IN, user: user });
    const dispatchSignOut = () => dispatch({ type: Actions.SIGN_OUT });
    const dispatchShowMenu = (show: boolean) => dispatch({ type: Actions.SHOW_MENU, show: show });
    const dispatchShowInfoUser = (show: boolean) => dispatch({ type: Actions.SHOW_USER_INFO, show: show });

    const editar = async (item: T): Promise<void> => dispatch({ type: Actions.EDITING, model: item });

    const cancelar = async () => dispatchCancel();

    const agregar = async (item: T): Promise<ResponseResult<T>> => {

        dispatchFetching();
        let resp: ResponseResult<T>;

        try {
            resp = await api.Post<T>(urlBase, item);
        } catch (error: any) {
            resp = errorResult<T>(error);
        }

        dispatchEditing(undefined);
        dispatchReload(true);
        dispatchFetchingComplete();
        return resp;
    }

    const actualizar = async (item: T): Promise<ResponseResult<T>> => {

        dispatchFetching();
        let resp: ResponseResult<T>;

        try {
            resp = await api.Put<T>(urlBase, item);
        } catch (error: any) {
            resp = errorResult<T>(error);
        }

        dispatchEditing(undefined);
        dispatchReload(true);
        dispatchFetchingComplete();
        return resp;
    }

    const todos = async (): Promise<void> => {

        dispatchFetching();
        let resp: ResponseResult<T[]>;

        try {
            resp = await api.Get<T[]>(urlBase);
            dispatchSetData(resp);
        } catch {
            dispatchSetData({} as ResponseResult<T[]>);
        }

        dispatchFetchingComplete();

    }

    const errorResult = <T>(ex: any) => {
        let message = 'Situación inesperada tratando de ejecutar la petición'
        if (ex instanceof Error) message = ex.message
        return {
            ok: false,
            mensaje: message,
        } as ResponseResult<T>
    }

    return {
        state,
        dispatch,
        editar,
        cancelar,
        agregar,
        actualizar,
        todos,
        errorResult,

        /* dispatch */
        dispatchFetching,
        dispatchFetchingComplete,
        dispatchEditing,
        dispatchCancel,
        dispatchReload,
        dispatchSetData,
        dispatchSignIn,
        dispatchSignOut,
        dispatchShowMenu,
        dispatchShowInfoUser,
    }

}