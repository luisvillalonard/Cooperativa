import { Card, CardProps, theme } from "antd"

export const Container = (props: CardProps) => {

    const { token } = theme.useToken()

    return (
        <Card
            {...props}
            style={{
                ...props.style,
                position: 'relative',
                backgroundColor: 'white',
                boxShadow: token.boxShadowTertiary,
            }}
            styles={{
                header: {
                    height: 'auto',
                    padding: 10,
                    ...props.styles?.header,
                },
                body: {
                    padding: 10,
                    ...props.styles?.body,
                }
            }}>
            {props.children}
        </Card>
    )
}
