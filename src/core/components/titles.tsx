import { ControlProps } from "@interfaces/global"
import { Typography, theme } from "antd"
import { TitleProps } from "antd/es/typography/Title"

type TitleCustomProps = Pick<TitleProps, "title" | "color">

export function TitlePage(props: TitleCustomProps) {

    const { title, color } = props
    const { token } = theme.useToken()

    return (
        <Typography.Title level={2} style={{ fontWeight: 'bolder', color: color ?? token.colorText }}>
            {
                typeof title === 'string'
                    ? <span style={{ textWrap: 'nowrap' }}>{title}</span>
                    : title
            }
        </Typography.Title>
    )
}

export function TitleSesion(props: TitleCustomProps) {

    const { title, color } = props
    const { token } = theme.useToken()

    return (
        <Typography.Title level={3} style={{ fontWeight: 'bolder', color: color ?? token.colorText }}>
            {
                typeof title === 'string'
                    ? <span style={{ textWrap: 'nowrap' }}>{title}</span>
                    : title
            }
        </Typography.Title>
    )
}