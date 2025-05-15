import { InputTimePicker } from "@components/dateTime"
import { FormModal } from "@components/form"
import { useGeneros } from "@contexts/auxiliares/generos"
import { useEmpleados } from "@contexts/empresas/empleados"
import { useEmpresas } from "@contexts/empresas/empresas"
import { useHorarios } from "@contexts/empresas/horarios"
import { Colors } from "@hooks/useConstants"
import { timeFormat } from "@hooks/useDate"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Empleado } from "@interfaces/empresas"
import { Col, Form, Input, Radio, Row, Select, Space, Switch } from "antd"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function FormEmpleado() {

    const { state: { modelo }, agregar, actualizar, cancelar } = useEmpleados()
    const { state: { datos: generos }, todos: cargarGeneros } = useGeneros()
    const { state: { datos: horarios }, todos: cargarHorarios } = useHorarios()
    const { state: { datos: empresas }, todos: cargarEmpresas } = useEmpresas()
    const { entidad, editar, handleChangeInput } = useForm<Empleado | undefined>(modelo)
    const esNuevo = !entidad ? true : entidad.id === 0 ? true : false

    const cargarAuxiliares = async () => await Promise.all([cargarGeneros(), cargarHorarios(), cargarEmpresas()]);

    const guardar = async () => {

        if (!entidad) return;

        let resp: any = undefined;

        try {
            if (esNuevo) {
                resp = await agregar(entidad);
            } else {
                resp = await actualizar(entidad);
            }

            if (!resp) {
                Alerta('No fue posible obtener una respuesta al intentar guardar los datos del empleado.');
            } else if (!resp.ok) {
                Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del empleado.');
            } else {
                Exito(`Empleado ${esNuevo ? 'registrado' : 'actualizado'}  exitosamente!`);
            }
        } catch (error: any) {
            Alerta(error.message || 'Situación inesperada tratando de guardar los datos del empleado.');
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
            name="formEmpleado"
            title="Empleado"
            autoComplete="off"
            open={entidad !== null}
            initialValues={entidad}
            onFinish={guardar}
            onClose={cancelar}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" maxLength={50} value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Genero" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Radio.Group
                    block
                    value={entidad.genero?.id}
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(evt) => {
                        if (entidad) {
                            editar({ ...entidad, genero: generos.filter(opt => opt.id === Number(evt.target.value))[0] });
                        }
                    }}>
                    {generos.map(item => (<Radio.Button value={item.id}>{item.descripcion}</Radio.Button>))}
                </Radio.Group>
            </Form.Item>
            <Form.Item name="cedula" label="C&eacute;dula" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="cedula" maxLength={50} value={entidad.cedula || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item name="correo" label="Correo Electr&oacute;nico" rules={[{ required: true, type: "email", message: 'Obligatorio' }]}>
                <Input name="correo" maxLength={50} value={entidad.correo || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Horario Laboral" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    allowClear
                    notFoundContent=""
                    defaultValue={entidad.horario?.id}
                    options={horarios.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value: number) => {
                        if (entidad) {
                            editar({ ...entidad, horario: horarios.filter(opt => opt.id === value)[0] });
                        }
                    }} />
            </Form.Item>
            <Form.Item label="Empresa" rules={[{ required: true, message: 'Obligatorio' }]}>
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
            <Form.Item>
                <Space>
                    <Switch
                        id="activo"
                        checked={entidad.activo}
                        onChange={(checked) => editar({ ...entidad, activo: checked })} />
                    <span>{entidad.activo ? 'Activo' : 'Inactivo'}</span>
                </Space>
            </Form.Item>
        </FormModal>
    )
}