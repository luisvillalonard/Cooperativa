import { Colors } from "@hooks/useConstants"
import { Card, CardProps, theme } from "antd"
import { CSSProperties } from "react"

const styleBase: CSSProperties = {
    position: 'relative',
    backgroundColor: 'white',
}

const styleHeader: CSSProperties = {
    height: 'auto',
    padding: 10,
}

export const Container = (props: CardProps) => {

    const { style } = props
    const { token } = theme.useToken()

    return (
        <Card
            {...props}
            style={{
                ...style,
                ...styleBase,
                boxShadow: token.boxShadowTertiary,
            }}
            styles={{
                header: { ...styleHeader, ...props.styles?.header },
                body: { padding: 10, ...props.styles?.body }
            }}>
            {props.children}
        </Card>
    )
}

export const ContainerCommands = (props: CardProps) => {

    const { style } = props
    const { token } = theme.useToken()

    return (
        <Card
            {...props}
            style={{
                ...style,
                ...styleBase,
                borderBottomWidth: 3,
                borderBottomColor: Colors.Success,
                borderRadius: 6,
                boxShadow: token.boxShadowTertiary,
            }}
            styles={{
                header: { ...styleHeader, ...props.styles?.header },
                body: { padding: 10, ...props.styles?.body }
            }}>
            {props.children}
        </Card>
    )
}
