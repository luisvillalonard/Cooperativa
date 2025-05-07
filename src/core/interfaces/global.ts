import { ButtonType } from 'antd/es/button';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { CSSProperties } from 'react';
import { IconType } from 'react-icons';

export interface ControlProps {
    children: React.ReactNode | React.ReactNode[],
    title?: string | React.ReactNode,
    icon?: React.ReactElement | JSX.Element | IconType,
    extra: React.ReactNode,
    message?: string,

    item?: any,
    list?: any[],
    filter?: string,

    active?: boolean,
    isOpen: boolean,
    inside?: boolean,
    loading?: boolean,
    wait?: boolean,

    size?: SizeType,
    buttonType?: ButtonType;
    buttonCircle?: boolean,
    style?: CSSProperties | undefined,
    color?: string,
    onClick?: (value: any) => void,
    onChange?: (value: any) => void,
    onCancel?: (value: any) => void,
    onRemove?: (value: any) => void,
    setFocus?: () => void,
}

export enum SessionStorageKeys {
    User = '_pos.usr',
    Token = '_pos.tk',
    ShowMenu = '_pos.sm',
    ShowUserInfo = '_pos.sui',
}

export interface RequestFilter {
    pageSize: number,
    currentPage: number,
    filter: string
}

export interface PagingResult {
    totalRecords: number,
    totalPage: number,
    previousPage: number | null,
    nextPage: number | null,
    descripcion: string,
    pageSize: number,
    currentPage: number,
    filter: string
}

export interface ResponseResult<T> {
    ok: boolean,
    datos: T | undefined,
    mensaje: string | undefined,
    paginacion: PagingResult | undefined
}

export enum ActionFetch {
    FETCHING = 'FETCHING',
    FETCH_COMPLETE = 'FETCH_COMPLETE',
}