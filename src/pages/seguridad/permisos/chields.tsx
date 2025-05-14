import { ControlProps } from "@interfaces/global";
import { Menu } from "@interfaces/seguridad";
import { Flex, Space, Switch } from "antd";

interface PermisoHijosProps extends Pick<ControlProps, "item" | "onChange" | "active"> { }

export default function PermisoHijos(props: PermisoHijosProps) {

    const { item, active, onChange } = props
    const menu: Menu = item

    return (
        <Flex key={menu.link} gap={16} align='center' style={{ marginBottom: 8 }}>
            <Switch size='small' checked={active} onChange={() => onChange?.(menu)} />
            <Space>{menu.titulo}</Space>
        </Flex>
    )
}