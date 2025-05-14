import { ControlProps } from '@interfaces/global';
import { Menu } from '@interfaces/seguridad';
import { Divider, Flex, Space, Switch, Typography } from 'antd';

interface PermisoPadreProps extends Pick<ControlProps, "item" | "onChange" | "children" | "style"> { }

export default function PermisoPadre(props: PermisoPadreProps) {

    const { item, children, style, onChange } = props
    const menu: Menu = item

    return (
        <Flex vertical style={{ ...style }}>
            <Flex align='center' justify='space-between'>
                <Typography.Title level={5}>{menu.titulo}</Typography.Title>
                <Flex gap={16} align='center' style={{ margin: 0 }}>
                    <Switch size='small' onChange={(value) => onChange?.(value)} />
                    <Space>Todos</Space>
                </Flex>
            </Flex>
            <Divider style={{ marginTop: 0, marginBottom: 6 }} />
            <Flex vertical>
                {children}
            </Flex>
        </Flex>
    )
}