import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { useEmpresas } from "@contexts/empresas/empresas"
import { Empresa } from "@interfaces/empresas"
import { Flex, Table, Tooltip } from "antd"

export default function ListadoEmpresas() {

    const { state: { datos }, editar } = useEmpresas()

    return (
        <Table<Empresa>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 empresas</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={50} />
            <Table.Column title="Nombre" render={(record: Empresa) => (record.nombre)} />
            <Table.Column title="RNC" render={(record: Empresa) => (record.rnc)} />
            <Table.Column title="Provincia" render={(record: Empresa) => (record.provincia?.nombre)} />
            <Table.Column title="Municipio" render={(record: Empresa) => (record.municipio?.nombre)} />
            <Table.Column title="Tel&eacute;fono" render={(record: Empresa) => (record.telefono)} />
            <Table.Column title="Estado" align="center" render={(record: Empresa) => (
                record.activa ? <TagSuccess text="Activa" /> : <TagDanger text="Inactiva" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Empresa) => (
                <Tooltip title={`Editar la empresa (${record.nombre})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}