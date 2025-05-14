import dayjs from 'dayjs';

dayjs.locale('es-DO');

export const dateFormat = 'DD-MM-YYYY';
export const timeFormat = 'HH:mm';

export function DD_MM_YYYY(date?: Date): string {
    if (!date) return ''
    return dayjs(date).format(dateFormat)
}

export function Date_To_Dayjs(date?: Date): (dayjs.Dayjs | undefined) {
    if (!date) return undefined
    return dayjs(date, dateFormat)
}

export function String_To_Dayjs(value?: string): (dayjs.Dayjs | undefined) {
    if (!value) return undefined
    return dayjs(value, dateFormat)
}

export function StringTime_To_Dayjs(value?: string): (dayjs.Dayjs | undefined) {
    if (!value) return undefined
    return dayjs(value, timeFormat)
}

export function String_To_Date(value?: string): (Date | undefined) {
    const date = String_To_Dayjs(value)
    if (!date) return undefined
    return date.toDate()
}
