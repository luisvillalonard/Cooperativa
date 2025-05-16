import { FormModal } from "@components/form"
import { useMunicipios } from "@contexts/configuraciones/municipios"
import { useProvincias } from "@contexts/configuraciones/provincias"
import { useEmpresas } from "@contexts/empresas/empresas"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Empresa } from "@interfaces/empresas"
import { Col, Form, Input, Row, Select, Space, Switch } from "antd"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function FormEmpresa() {

    const { state: { modelo }, agregar, actualizar, cancelar } = useEmpresas()
    const { state: { datos: provincias }, todos: cargarProvincias } = useProvincias()
    const { state: { datos: municipios }, todos: cargarMunicipios } = useMunicipios()
    const { entidad, editar, handleChangeInput } = useForm<Empresa | undefined>(modelo)
    const esNuevo = !entidad ? true : entidad.id === 0 ? true : false

    const cargarAuxiliares = async () => Promise.all([cargarProvincias(), cargarMunicipios()])

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
                Alerta('No fue posible obtener una respuesta al intentar guardar los datos de la empresa.');
            } else if (!resp.ok) {
                Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los datos de la empresa.');
            } else {
                Exito(`Empresa ${esNuevo ? 'registrada' : 'actualizada'}  exitosamente!`);
            }
        } catch (error: any) {
            Alerta(error.message || 'Situación inesperada tratando de guardar los datos de la empresa.');
        }
    }

    useEffect(() => {
        editar(modelo);
        if (modelo) { cargarAuxiliares() }
    }, [modelo])

    if (!entidad) {
        return <Outlet />
    }

    return (
        <FormModal
            name="formEmpresa"
            title="Empresa"
            autoComplete="off"
            width={1000}
            open={entidad !== null}
            initialValues={entidad}
            onFinish={guardar}
            onClose={cancelar}>
            <Row gutter={16}>
                <Col xs={24}>
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="nombre" maxLength={200} value={entidad.nombre || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Provincia" name="provinciaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Select
                            allowClear
                            notFoundContent=""
                            defaultValue={entidad.provinciaId}
                            options={provincias.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                            onChange={(value: number) => {
                                if (entidad) {
                                    editar({ ...entidad, provinciaId: provincias.filter(opt => opt.id === value)[0]?.id ?? 0 });
                                }
                            }} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Municipio" name="municipioId" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Select
                            allowClear
                            notFoundContent=""
                            defaultValue={Number(entidad.municipioId)}
                            options={municipios.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                            onChange={(value: number) => {
                                if (entidad) {
                                    editar({ ...entidad, municipioId: municipios.filter(opt => opt.id === value)[0]?.id ?? 0 });
                                }
                            }} />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item name="direccion" label="Direcci&oacute;n">
                        <Input name="direccion" maxLength={150} value={entidad.direccion || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="rnc" label="RNC" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="rnc" maxLength={20} value={entidad.rnc || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="telefono" label="Tel&eacute;fono">
                        <Input name="telefono" maxLength={12} value={entidad.telefono || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="correo" label="Correo Electr&oacute;nico">
                        <Input name="correo" maxLength={75} value={entidad.correo || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="fax" label="N&uacute;mero Fax">
                        <Input name="fax" maxLength={12} value={entidad.fax || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Form.Item name="webSite" label="Sitio Web">
                        <Input name="webSite" maxLength={100} value={entidad.webSite || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24} style={{ alignSelf: 'end' }}>
                    <Form.Item>
                        <Space>
                            <Switch
                                id="activo"
                                checked={entidad.activa}
                                onChange={(checked) => editar({ ...entidad, activa: checked })} />
                            <span>{entidad.activa ? 'Activa' : 'Inactiva'}</span>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </FormModal>
    )
}