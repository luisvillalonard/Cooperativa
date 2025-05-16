import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { useSucursales } from "@contexts/empresas/sucursales"
import { Sucursal } from "@interfaces/empresas"
import { Flex, Table, Tooltip } from "antd"

export default function ListadoSucursales() {

    const { state: { datos }, editar } = useSucursales()

    return (
        <Table<Sucursal>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 sucursales</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={50} />
            <Table.Column title="Nombre" render={(record: Sucursal) => (record.nombre)} />
            <Table.Column title="RNC" render={(record: Sucursal) => (record.rnc)} />
            <Table.Column title="Provincia" render={(record: Sucursal) => (record.provincia?.nombre)} />
            <Table.Column title="Municipio" render={(record: Sucursal) => (record.municipio?.nombre)} />
            <Table.Column title="Tel&eacute;fono" render={(record: Sucursal) => (record.telefono)} />
            <Table.Column title="Estado" align="center" render={(record: Sucursal) => (
                record.activa ? <TagSuccess text="Activa" /> : <TagDanger text="Inactiva" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Sucursal) => (
                <Tooltip title={`Editar la sucursal (${record.nombre})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}