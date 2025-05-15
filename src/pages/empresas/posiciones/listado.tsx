import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { usePosiciones } from "@contexts/empresas/posiciones"
import { FormatNumber } from "@hooks/useUtils"
import { Posicion } from "@interfaces/empresas"
import { Flex, Table, Tooltip } from "antd"

export default function Listado() {

    const { state: { datos }, editar } = usePosiciones()

    return (
        <Table<Posicion>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 posiciones</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={50} />
            <Table.Column title="Nombre" render={(record: Posicion) => (record.nombre)} />
            <Table.Column title="Descripci&oacute;n" render={(record: Posicion) => (record.descripcion)} />
            <Table.Column title="Sueldo RD$" render={(record: Posicion) => (FormatNumber(record.sueldo, 2))} />
            <Table.Column title="Estado" align="center" render={(record: Posicion) => (
                record.activa ? <TagSuccess text="Activa" /> : <TagDanger text="Inactiva" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Posicion) => (
                <Tooltip title={`Editar la posición (${record.nombre})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}