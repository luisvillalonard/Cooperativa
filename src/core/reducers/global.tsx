import { PagingResult, RequestFilter, ResponseResult } from "@interfaces/global";

export enum Actions {
    FETCHING = 'FETCHING',
    FETCH_COMPLETE = 'FETCH_COMPLETE',
    EDITING = 'EDITING',
    CANCEL = 'CANCEL',
    SET_DATA = 'SET_DATA',
    RELOAD = 'RELOAD',
    SIGN_IN = 'SIGN_IN',
    SIGN_OUT = 'SIGN_OUT',
    SHOW_MENU = 'SHOW_MENU',
    SHOW_USER_INFO = 'SHOW_USER_INFO',
}

export type ActionTypes<DataType> =
    | { type: Actions.FETCHING }
    | { type: Actions.FETCH_COMPLETE }
    | { type: Actions.EDITING; model?: DataType }
    | { type: Actions.CANCEL }
    | { type: Actions.SET_DATA; data: DataType[]; paginacion?: PagingResult; }
    | { type: Actions.RELOAD; recargar: boolean }
    /* AUTH */
    | { type: Actions.SIGN_IN; user: DataType }
    | { type: Actions.SIGN_OUT }
    | { type: Actions.SHOW_MENU; show: boolean }
    | { type: Actions.SHOW_USER_INFO; show: boolean }

export interface State<DataType> {
    user?: DataType,
    modelo?: DataType,
    datos: DataType[],
    procesando: boolean,
    editando: boolean,
    recargar: boolean,
    cargado: boolean,
    paginacion?: PagingResult
    /* AUTH */
    showMenu: boolean,
    showUserInfo: boolean,
}

export interface GlobalContextState<T> {
    state: State<T>,
    nuevo: () => void,
    editar: (item: T) => Promise<void>,
    agregar: (item: T) => Promise<ResponseResult<T>>,
    actualizar: (item: T) => Promise<ResponseResult<T>>,
    todos: (filter?: RequestFilter) => void,
    cancelar: () => void,
}

export function initState<DataType extends unknown>() {
    const init: State<DataType> = {
        datos: [],
        procesando: false,
        editando: false,
        recargar: false,
        cargado: false,
        showMenu: true,
        showUserInfo: false,
    };
    return init;
}

const reducer = <DataType extends unknown>(state: State<DataType>, action: ActionTypes<DataType>): State<DataType> => {

    switch (action.type) {

        case Actions.FETCHING: {
            return { ...state, procesando: true };
        }

        case Actions.FETCH_COMPLETE: {
            return { ...state, procesando: false };
        }

        case Actions.EDITING: {
            return { ...state, modelo: action.model };
        }

        case Actions.CANCEL: {
            return { ...state, modelo: undefined, editando: false };
        }

        case Actions.RELOAD: {
            return { ...state, recargar: action.recargar };
        }

        case Actions.SET_DATA: {
            return { ...state, datos: action.data, paginacion: action.paginacion, cargado: true, recargar: false };
        }

        case Actions.SIGN_IN: {
            return { ...state, user: action.user };
        }

        case Actions.SIGN_OUT: {
            return { ...state, user: undefined };
        }

        case Actions.SHOW_MENU: {
            return { ...state, showMenu: action.show };
        }

        case Actions.SHOW_USER_INFO: {
            return { ...state, showUserInfo: action.show };
        }

        default: {
            return state;
        }
    }

};

export default reducer;