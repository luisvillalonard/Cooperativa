import { ButtonDefault, ButtonPrimary } from "@components/buttons"
import { Container } from "@components/containers"
import Loading from "@components/loading"
import { TitlePage } from "@components/titles"
import { useAuth } from "@contexts/seguridad/auth"
import { usePermisos } from "@contexts/seguridad/permisos"
import { Urls } from "@hooks/useConstants"
import { useForm } from "@hooks/useForm"
import { Alerta, Exito } from "@hooks/useMensaje"
import { Menu, Permiso, Rol } from "@interfaces/seguridad"
import { Alert, Col, Flex, Form, Input, Row, Space, Switch, Typography } from "antd"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import PermisoHijos from "./chields"
import PermisoPadre from "./parent"

export default function FormPermisos() {

    const { state: { user }, LoggedIn } = useAuth()
    const { state: { modelo, procesando }, nuevo, agregar, actualizar, cancelar, menus, getByRolId } = usePermisos()
    const { entidad, editar, handleChangeInput } = useForm<Rol | undefined>(modelo)
    const [itemsMenu, setItemsMenu] = useState<Menu[]>([])
    const [errores, setErrores] = useState<string[]>([])
    const nav = useNavigate()
    const url = useLocation()
    const { id } = useParams()

    const cargarOpcionesMenu = async () => {

        const result = await menus();
        if (result && result.datos) {
            setItemsMenu(result.datos);
        } else {
            setItemsMenu([]);
        }

    }

    const cargarRol = async (rolId: number) => {

        // Cargo todas las opciones del menú
        await cargarOpcionesMenu();

        // Busco el rol
        const result = await getByRolId(rolId);
        if (!result) {
            setErrores(['El código del períl de usuario que intenta cargar es inválido.'])
        } else if (result.datos) {
            editar(result.datos);
        }
    }

    const cambiarPermiso = (item: Menu) => {

        if (!entidad) return;

        let oldPermition: Permiso[] = entidad.permisos;
        const permiso = entidad.permisos.filter(child => child.menu.id === item.id)[0];

        if (!permiso) {
            oldPermition.push({
                id: 0,
                rolId: entidad.id,
                menu: item,
            } as Permiso);
        } else {
            oldPermition = entidad.permisos.filter(perm => perm.menu.id !== item.id)
        }

        editar({ ...entidad, permisos: oldPermition });

    }

    const marcarTodos = (padre: Menu, value: boolean) => {

        if (!entidad) return;

        const hijos = itemsMenu
            .filter(opt => opt.padre === padre.id)
            .map(opt => ({ id: 0, rolId: entidad.id, menu: opt, checked: value } as Permiso));
        const otrosPermisos = entidad.permisos.filter(opt => opt.menu.padre !== padre.id);
        editar({
            ...entidad,
            permisos: [...otrosPermisos, ...hijos]
        });

    }

    const guardar = async () => {

        if (!entidad) return;

        let resp;
        const esNuevo = !entidad ? true : entidad.id === 0 ? true : false;

        try {
            if (esNuevo) {
                resp = await agregar(entidad);
            } else {
                resp = await actualizar(entidad);
            }

            if (!resp) {
                Alerta('Situación inesperada tratando de guardar los permisos del perfíl.');
            } else if (!resp.ok) {
                Alerta(resp.mensaje || 'Situación inesperada tratando de guardar los permisos del perfíl.');
            } else {

                // Si el rol modificado es el que tiene el usuario logeado en la aplicación, lo actualizo
                if (user?.rol?.id === entidad.id) {
                    LoggedIn({ ...user, rol: entidad })
                }

                // Muestro el mensaje de exito
                Exito(
                    `Rol y permisos ${esNuevo ? 'registrados' : 'actualizados'}  exitosamente!`,
                    () => nav(`/${Urls.Seguridad.Base}/${Urls.Seguridad.Permisos}`, { replace: true })
                );
            }
        } catch (error: any) {
            Alerta(error.message || 'Situación inesperada tratando de guardar los datos.');
        }
    }

    const onClose = () => {
        cancelar();
        nav(`/${Urls.Seguridad.Base}/${Urls.Seguridad.Permisos}`, { replace: true });
    }

    useEffect(() => {
        cargarOpcionesMenu();
        if (modelo) {
            editar(modelo)
        }
    }, [modelo])
    useEffect(() => {
        if (id && Number(id) && Number(id) > 0) {
            cargarRol(Number(id));
        } else {
            nuevo();
        }
    }, [url.pathname, id])

    if (!entidad) {
        return <Outlet />
    }

    return (
        <>
            <Col span={20} offset={2}>

                <TitlePage title="Rol y Permisos" />

                <Container className="mb-3">
                    <Flex align="center" justify="end">
                        <Space>
                            <ButtonDefault key="1" htmlType="button" onClick={onClose}>Ir a Perf&iacute;les</ButtonDefault>
                            <ButtonPrimary key="2" htmlType="submit" form="FormPermisos">
                                {entidad && entidad.id > 0 ? 'Actualizar' : 'Guardar'}
                            </ButtonPrimary>
                        </Space>
                    </Flex>
                </Container>

                <>
                    {
                        errores.length === 0
                            ? <></>
                            :
                            <Alert
                                showIcon
                                type="warning"
                                message="Alerta"
                                className="mb-3"
                                description={
                                    <ul>
                                        {errores.map(err => <li>{err}</li>)}
                                    </ul>
                                }
                            />
                    }
                </>

                <Row gutter={[30, 20]}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Typography.Title level={4} style={{ marginBottom: 10 }}>Rol de Usuario</Typography.Title>
                        <Container>
                            <Form
                                name="FormPermisos"
                                layout="vertical"
                                autoComplete="off"
                                size="large"
                                initialValues={entidad}
                                onFinish={guardar}>
                                <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                                    <Input
                                        name="nombre"
                                        maxLength={50}
                                        value={entidad.nombre || ''}
                                        onChange={handleChangeInput} />
                                </Form.Item>
                                <Form.Item name="descripcion" label="Descripci&oacute;n">
                                    <Input.TextArea
                                        name="descripcion"
                                        maxLength={250}
                                        rows={3}
                                        style={{ resize: 'none' }}
                                        value={entidad.descripcion || ''}
                                        onChange={handleChangeInput} />
                                </Form.Item>
                                <Form.Item name="esAdmin" valuePropName="checked">
                                    <Space>
                                        <Switch
                                            checked={entidad.esAdmin}
                                            onChange={(checked) => editar({ ...entidad, esAdmin: checked })} />
                                        <Typography.Text style={{ lineHeight: 0.5 }}>Este rol define al usuario como un Administrador del sistema</Typography.Text>
                                    </Space>
                                </Form.Item>
                                <Form.Item name="activo" valuePropName="checked">
                                    <Space>
                                        <Switch
                                            checked={entidad.activo}
                                            onChange={(checked) => editar({ ...entidad, activo: checked })} />
                                        <span>{entidad.activo ? 'Activo' : 'Inactivo'}</span>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Container>

                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Typography.Title level={4} style={{ marginBottom: 10 }}>Permisos</Typography.Title>
                        <Container>
                            <>
                                {
                                    itemsMenu
                                        .filter(opt => opt.padre === 0)
                                        .map((padre: Menu, menuIndex: number) => {
                                            return (
                                                <PermisoPadre
                                                    key={menuIndex}
                                                    item={padre}
                                                    style={{ marginBottom: 10 }}
                                                    onChange={(value: boolean) => marcarTodos(padre, value)}>
                                                    <>
                                                        {
                                                            itemsMenu
                                                                .filter(hijo => hijo.padre === padre.id)
                                                                .map((hijo, hijoIndex) => {
                                                                    const activo: boolean = entidad && entidad.permisos && entidad.permisos.findIndex(opt => opt.menu.id === hijo.id) >= 0;
                                                                    return <PermisoHijos key={hijoIndex} item={hijo} active={activo} onChange={() => cambiarPermiso(hijo)} />
                                                                })
                                                        }
                                                    </>
                                                </PermisoPadre>
                                            )
                                        })
                                }
                            </>
                        </Container>
                    </Col>
                </Row>
            </Col >
            <Loading fullscreen active={procesando} message="Procesando, espere..." />
        </>
    )
}