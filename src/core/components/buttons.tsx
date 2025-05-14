import { Colors } from '@hooks/useConstants'
import { IconEdit } from '@hooks/useIconos'
import type { ButtonProps } from 'antd'
import { Button } from 'antd'

const CustomButton = (props: ButtonProps) => {

    const { type, icon, shape, children, onClick } = props

    return (
        <Button
            {...props}
            type={type ?? "primary"}
            icon={icon}
            shape={shape ?? "round"}
            onClick={onClick}>
            {children}
        </Button>
    )
}

export const ButtonPrimary = (props: ButtonProps) => {
    return <CustomButton {...props}>{props.children}</CustomButton>
}

export const ButtonSuccess = (props: ButtonProps) => {
    return <CustomButton {...props} variant="solid" style={{ backgroundColor: Colors.Success, borderColor: Colors.Success }}>{props.children}</CustomButton>
}

export const ButtonDanger = (props: ButtonProps) => {
    return <CustomButton {...props} danger>{props.children}</CustomButton>
}

export const ButtonDefault = (props: ButtonProps) => {
    return <CustomButton {...props} type='default'>{props.children}</CustomButton>
}

export const ButtonText = (props: ButtonProps) => {
    return <CustomButton {...props} type='text'>{props.children}</CustomButton>
}

export const ButtonEdit = (props: ButtonProps) => {
    return (
        <CustomButton {...props} type='text' shape='default' icon={<IconEdit style={{ fontSize: 24 }} />}>
            {props.children}
        </CustomButton>
    )
}