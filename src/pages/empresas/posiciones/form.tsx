import { FormModal } from "@components/form"
import InputNumbers from "@components/inputs/number"
import { usePosiciones } from "@contexts/empresas/posiciones"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Posicion } from "@interfaces/empresas"
import { Form, Input, InputNumber, Space, Switch } from "antd"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function FormPosicion() {

    const { state: { modelo }, agregar, actualizar, cancelar } = usePosiciones()
    const { entidad, editar, handleChangeInput } = useForm<Posicion | undefined>(modelo)
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
                Alerta('No fue posible obtener una respuesta al intentar guardar los datos de la posición.');
            } else if (!resp.ok) {
                Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos de la posición.');
            } else {
                Exito(`Posición ${esNuevo ? 'registrado' : 'actualizado'}  exitosamente!`);
            }
        } catch (error: any) {
            Alerta(error.message || 'Situación inesperada tratando de guardar los datos de la posición.');
        }
    }

    useEffect(() => { editar(modelo) }, [modelo])

    if (!entidad) {
        return <Outlet />
    }

    return (
        <FormModal
            name="formPosicion"
            title="Posici&oacute;n"
            autoComplete="off"
            open={entidad !== null}
            initialValues={entidad}
            onFinish={guardar}
            onClose={cancelar}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" maxLength={50} value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item name="descripcion" label="Descripci&oacute;n" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="descripcion" maxLength={50} value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item name="sueldo" label="Sueldo RD$" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumbers
                    name="sueldo"
                    defaultValue={entidad.sueldo}
                    value={entidad.sueldo}
                    placeholder="0.00"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={(value) => {
                        if (entidad) {
                            editar({ ...entidad, sueldo: Number(value) });
                        }
                    }} />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Switch
                        id="activo"
                        checked={entidad.activa}
                        onChange={(checked) => editar({ ...entidad, activa: checked })} />
                    <span>{entidad.activa ? 'Activa' : 'Inactiva'}</span>
                </Space>
            </Form.Item>
        </FormModal>
    )
}