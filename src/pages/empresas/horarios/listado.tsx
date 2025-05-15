import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { useHorarios } from "@contexts/empresas/horarios"
import { Horario } from "@interfaces/empresas"
import { Flex, Table, Tooltip } from "antd"

export default function Listado() {

    const { state: { datos }, editar } = useHorarios()

    return (
        <Table<Horario>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 horarios</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={50} />
            <Table.Column title="Nombre" render={(record: Horario) => (record.nombre)} />
            <Table.Column title="Hora Inicio" render={(record: Horario) => (record.horaInicio)} />
            <Table.Column title="Hora F&iacute;n" render={(record: Horario) => (record.horaFin)} />
            <Table.Column title="Estado" align="center" render={(record: Horario) => (
                record.activo ? <TagSuccess text="Activo" /> : <TagDanger text="Inactivo" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Horario) => (
                <Tooltip title={`Editar el horario (${record.nombre})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}