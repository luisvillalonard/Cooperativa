import { InputTimePicker } from "@components/dateTime"
import { FormModal } from "@components/form"
import { useHorarios } from "@contexts/empresas/horarios"
import { timeFormat } from "@hooks/useDate"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Horario } from "@interfaces/empresas"
import { Col, Form, Input, Row, Space, Switch } from "antd"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function FormUsuario() {

    const { state: { modelo }, agregar, actualizar, cancelar } = useHorarios()
    const { entidad, editar, handleChangeInput } = useForm<Horario | undefined>(modelo)
    const esNuevo = !entidad ? true : entidad.id === 0 ? true : false

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
                Alerta('No fue posible obtener una respuesta al intentar guardar los datos del horario.');
            } else if (!resp.ok) {
                Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos del horario.');
            } else {
                Exito(`Horario ${esNuevo ? 'registrado' : 'actualizado'}  exitosamente!`);
            }
        } catch (error: any) {
            Alerta(error.message || 'Situación inesperada tratando de guardar los datos del horario.');
        }
    }

    useEffect(() => { editar(modelo) }, [modelo])

    if (!entidad) {
        return <Outlet />
    }

    return (
        <FormModal
            name="formHorario"
            title="Horario"
            autoComplete="off"
            open={entidad !== null}
            initialValues={entidad}
            onFinish={guardar}
            onClose={cancelar}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" maxLength={50} value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Row gutter={16}>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="horaInicio" label="Hora Inicio" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <InputTimePicker name="horaInicio" value={entidad.horaInicio} block
                            onChange={(date) => {
                                if (entidad) {
                                    editar({ ...entidad, horaInicio: !date ? '' : date.format(timeFormat) });
                                }
                            }} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="horaFin" label="Hora F&iacute;n" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <InputTimePicker name="horaFin" value={entidad.horaFin} block
                            onChange={(date) => {
                                if (entidad) {
                                    editar({ ...entidad, horaFin: !date ? '' : date.format(timeFormat) });
                                }
                            }} />
                    </Form.Item>
                </Col>
            </Row>
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