import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagSuccess } from "@components/tags"
import { useUsuarios } from "@contexts/seguridad/usuarios"
import { Usuario } from "@interfaces/seguridad"
import { Flex, Table, Tooltip } from "antd"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Listado() {

    const { state, editar, todos } = useUsuarios()
    const { datos, recargar } = state
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])
    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table<Usuario>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={datos.map((item, index) => { return { ...item, key: index + 1 } })}
            locale={{ emptyText: <Flex>0 usuarios</Flex> }}
        >
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
            <Table.Column title="Acceso" dataIndex="acceso" key="acceso" />
            <Table.Column title="Rol" render={(record: Usuario) => (record.rol?.nombre)} />
            <Table.Column title="Empleado" render={(record: Usuario) => (record.empleado?.nombre)} />
            <Table.Column title="Empresa" render={(record: Usuario) => (record.empresa?.nombre)} />
            <Table.Column title="Cambio Clave" align="center" render={(record: Usuario) => (
                record.cambio ? <TagSuccess text="Si" /> : <TagDanger text="No" />
            )} />
            <Table.Column title="Estado" align="center" render={(record: Usuario) => (
                record.activo ? <TagSuccess text="Activo" /> : <TagDanger text="Inactivo" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Usuario) => (
                <Tooltip title={`Editar el usuario (${record.acceso})`}>
                    <ButtonEdit onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}