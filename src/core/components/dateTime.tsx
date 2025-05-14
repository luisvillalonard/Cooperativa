import { Date_To_Dayjs, StringTime_To_Dayjs, String_To_Dayjs, dateFormat, timeFormat } from "@hooks/useDate";
import { DatePicker, DatePickerProps, TimePicker, TimePickerProps } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('es-DO');
dayjs.extend(customParseFormat);

interface InputDatePickerProps extends Omit<DatePickerProps, "value" | "minDate" | "defaultValue"> { }

export function InputDatePicker(props: InputDatePickerProps & {
    minDate?: Date,
    value?: string,
}) {

    const { minDate, value, disabled, placeholder, onChange } = props

    return (
        <DatePicker
            placeholder={placeholder}
            minDate={Date_To_Dayjs(minDate)}
            defaultValue={value ? String_To_Dayjs(value) : undefined}
            value={value ? String_To_Dayjs(value) : undefined}
            format={dateFormat}
            disabled={disabled}
            onChange={onChange}
            style={{ width: '100%' }} />
    )
}

export function InputTimePicker(props: Omit<TimePickerProps, "value"> & {
    value?: string,
    block?: boolean,
}) {

    const { value, block, disabled, placeholder, onChange } = props

    return (
        <TimePicker
            {...props}
            placeholder={placeholder}
            defaultValue={value ? StringTime_To_Dayjs(value) : undefined}
            value={value ? StringTime_To_Dayjs(value) : undefined}
            format={timeFormat}
            /* use12Hours={true} */
            disabled={disabled}
            onChange={onChange}
            style={{ width: block ? '100%' : 'auto' }} />
    )
}