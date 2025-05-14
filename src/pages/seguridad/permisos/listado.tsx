import { ButtonEdit } from "@components/buttons"
import { TagDanger, TagDefault, TagSuccess } from "@components/tags"
import { usePermisos } from "@contexts/seguridad/permisos"
import { Urls } from "@hooks/useConstants"
import { ControlProps } from "@interfaces/global"
import { Rol } from "@interfaces/seguridad"
import { Flex, Table, Tooltip } from "antd"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Listado(props: Pick<ControlProps, "filter">) {

    const { filter = '' } = props
    const { state: { datos, procesando, recargar }, todos } = usePermisos()
    const nav = useNavigate()
    const url = useLocation()

    const cargar = async () => await todos();

    const onEdit = (rol: Rol) => {
        nav(`/${Urls.Seguridad.Base}/${Urls.Seguridad.PermisosFormulario.replace(':id?', rol.id.toString())}`, { replace: true });
    }

    useEffect(() => { cargar() }, [url.pathname])
    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table<Rol>
            size="middle"
            bordered={false}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos
                        .filter(item => {
                            return (
                                item.nombre.toLowerCase().indexOf(filter) >= 0 ||
                                (item.descripcion || '').toLowerCase().indexOf(filter) >= 0
                            )
                        })
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 clientes</Flex> }}
            scroll={{ x: 'max-content' }}>
            <Table.Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
            <Table.Column title="Código" dataIndex="nombre" key="nombre" />
            <Table.Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Table.Column title="Es Administrador" align="center" render={(record: Rol) => (
                record.esAdmin ? <TagSuccess text="Si" /> : <TagDanger text="No" />
            )} />
            <Table.Column title="Estado" align="center" render={(record: Rol) => (
                record.activo ? <TagSuccess text="Activo" /> : <TagDefault text="Inactivo" />
            )} />
            <Table.Column title="Acci&oacute;n" align="center" width={80} render={(record: Rol) => (
                <Tooltip title={`Editar el perfíl de usuario (${record.nombre})`}>
                    <ButtonEdit type="text" onClick={() => onEdit(record)} />
                </Tooltip>
            )} />
        </Table>
    )

}