import { FormModal } from "@components/form"
import { useEmpleados } from "@contexts/empresas/empleados"
import { useEmpresas } from "@contexts/empresas/empresas"
import { usePermisos } from "@contexts/seguridad/permisos"
import { useUsuarios } from "@contexts/seguridad/usuarios"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Rol, Usuario } from "@interfaces/seguridad"
import { Form, Input, Select, Space, Switch } from "antd"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export default function FormUsuario() {

    const { state: { modelo }, agregar, actualizar, cancelar } = useUsuarios()
    const { roles: cargarRoles } = usePermisos()
    const { state: { datos: empleados }, todos: cargarEmpleados } = useEmpleados()
    const { state: { datos: empresas }, todos: cargarEmpresas } = useEmpresas()
    const [roles, setRoles] = useState<Rol[]>([])
    const { entidad, editar, handleChangeInput } = useForm<Usuario | undefined>(modelo)
    const esNuevo = !entidad ? true : entidad.id === 0 ? true : false;

    const cargarAuxiliares = async () => await Promise.all([cargarRoles(), cargarEmpleados(), cargarEmpresas()]).then(([result]) => {
        if (result && result.datos) {
            setRoles(result.datos)
        }
    })

    const guardar = async () => {

        if (!entidad) return;

        let resp;
        if (esNuevo) {
            resp = await agregar(entidad);
        } else {
            resp = await actualizar(entidad);
        }

        if (!resp) {
            Alerta('No fue posible obtener una respuesta al intentar guardar los datos del usuario.');
        } else if (!resp.ok) {
            Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del usuario.');
        } else {
            Exito(`Usuario ${esNuevo ? 'registrado' : 'actualizado'}  exitosamente!`);
        }
    }

    useEffect(() => {
        editar(modelo);
        if (modelo) { cargarAuxiliares() };
    }, [modelo])

    if (!entidad) {
        return <Outlet />
    }

    return (
        <FormModal
            name="formUsuario"
            title="Usuario"
            autoComplete="off"
            open={entidad !== null}
            initialValues={entidad}
            onFinish={guardar}
            onClose={cancelar}>
            <Form.Item name="acceso" label="Usuario" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="acceso" maxLength={25} value={entidad.acceso || ''} disabled={!esNuevo} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Perf&iacute;l de Usuario" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    allowClear
                    notFoundContent=""
                    defaultValue={entidad.rol?.id}
                    options={roles.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value: number) => {
                        if (entidad) {
                            editar({ ...entidad, rol: roles.filter(opt => opt.id === value)[0] });
                        }
                    }} />
            </Form.Item>
            <Form.Item label="Empleado">
                <Select
                    allowClear
                    notFoundContent=""
                    defaultValue={entidad.empleado?.id}
                    options={empleados.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value: number) => {
                        if (entidad) {
                            editar({ ...entidad, empleado: empleados.filter(opt => opt.id === value)[0] });
                        }
                    }} />
            </Form.Item>
            <Form.Item label="Empresas">
                <Select
                    allowClear
                    notFoundContent=""
                    defaultValue={entidad.empresa?.id}
                    options={empresas.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value: number) => {
                        if (entidad) {
                            editar({ ...entidad, empresa: empresas.filter(opt => opt.id === value)[0] });
                        }
                    }} />
            </Form.Item>
            {
                esNuevo
                    ? <></>
                    :
                    <Form.Item>
                        <Space>
                            <Switch
                                id="cambioClave"
                                checked={entidad.cambio}
                                onChange={(checked) => editar({ ...entidad, cambio: checked })} />
                            <span>Esta usuario cambio su clave de acceso</span>
                        </Space>
                    </Form.Item>
            }
            {
                esNuevo
                    ? <></>
                    :
                    <Form.Item>
                        <Space>
                            <Switch
                                id="usuarioActivo"
                                checked={entidad.activo}
                                onChange={(checked) => editar({ ...entidad, activo: checked })} />
                            <span>{entidad.activo ? 'Activo' : 'Inactivo'}</span>
                        </Space>
                    </Form.Item>
            }
        </FormModal>
    )
}