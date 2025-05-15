import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { useEmpleados } from "@contexts/empresas/empleados"
import { FormatNumber } from "@hooks/useUtils"
import { Empleado } from "@interfaces/empresas"
import { Flex, Table, Tooltip } from "antd"

export default function Listado() {

    const { state: { datos }, editar } = useEmpleados()

    return (
        <Table<Empleado>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 empleado</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={50} />
            <Table.Column title="Nombre" render={(record: Empleado) => (record.nombre)} />
            <Table.Column title="Sexo" render={(record: Empleado) => (record.genero?.descripcion)} />
            <Table.Column title="C&eacute;dula" render={(record: Empleado) => (record.cedula)} />
            <Table.Column title="Horario" render={(record: Empleado) => (record.horario?.nombre)} />
            <Table.Column title="Posici&iocute;n" render={(record: Empleado) => (record.posicion?.nombre)} />
            <Table.Column title="Salario" render={(record: Empleado) => (FormatNumber(record.salario, 2))} />
            <Table.Column title="Fecha Entrada" render={(record: Empleado) => (record.fechaEntrada)} />
            <Table.Column title="Estado" align="center" render={(record: Empleado) => (
                record.activo ? <TagSuccess text="Activo" /> : <TagDanger text="Inactivo" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Empleado) => (
                <Tooltip title={`Editar el empleado (${record.nombre})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}