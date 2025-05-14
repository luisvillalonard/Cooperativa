import { Typography, theme } from "antd"
import { TitleProps } from "antd/es/typography/Title"

type TitleCustomProps = Pick<TitleProps, "title" | "color">

export function TitlePage(props: TitleCustomProps) {

    const { title, color } = props
    const { token } = theme.useToken()

    return (
        <Typography.Title level={2} style={{ fontWeight: 'bolder', color: color ?? token.colorText }}>
            {title}
        </Typography.Title>
    )
}

export function TitleSesion(props: TitleCustomProps) {

    const { title, color } = props
    const { token } = theme.useToken()

    return (
        <Typography.Title level={3} style={{ fontWeight: 'bolder', color: color ?? token.colorText }}>
            {title}
        </Typography.Title>
    )
}

export function TitlePanel(props: TitleCustomProps) {

    const { title, color } = props
    const { token } = theme.useToken()

    return (
        <Typography.Title level={5} style={{ fontWeight: 500, marginBottom: 0, color: color ?? token.colorText }}>
            {title}
        </Typography.Title>
    )
}