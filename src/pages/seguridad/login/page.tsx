import { useAuth } from "@contexts/seguridad/auth";
import { Urls } from "@hooks/useConstants";
import { IconLock, IconUser } from "@hooks/useIconos";
import { Login } from "@interfaces/auth";
import { Alert, Button, Checkbox, Col, Flex, Form, Input, Layout, Typography } from "antd";
import { CSSProperties, useState } from "react";
import { Navigate } from "react-router-dom";

const bgBlack: CSSProperties = {
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
}

const inputStyle: CSSProperties = {
    borderBottomColor: 'white',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderRadius: 0,
    color: 'white',
    fontWeight: 'lighter',
    fontSize: 18,
}

export default function PageLogin() {

    const { state: { procesando }, validar, LoggedIn } = useAuth()
    const [error, setError] = useState<string>('')

    const onFinish = async (values: Login) => {

        const result = await validar(values);
        if (!result || !result.ok) {
            setError(result.mensaje || 'Situación inesperada tratando de validar los datos del usuario.');
            return;
        }

        if (result.ok && result.datos) {
            LoggedIn(result.datos);
            <Navigate to={Urls.Home} replace />
        }

    };

    return (
        <Layout className="vh-100 body-login">
            <Flex
                align="center"
                className="h-100"
                style={bgBlack}>
                <Col lg={{ span: 16, offset: 4 }} md={{ span: 18, offset: 3 }} sm={{ span: 20, offset: 2 }} xs={{ span: 20, offset: 2 }}>
                    <h1 className="display-2 mb-4" style={{ color: 'white', textAlign: 'center' }}>SISTEMA COOPERATIVA</h1>

                    <Col lg={{ span: 12, offset: 6 }} md={{ span: 12, offset: 6 }} sm={{ span: 20, offset: 2 }} xs={{ span: 20, offset: 2 }}>
                        <Form
                            name="formLogin"
                            layout="vertical"
                            initialValues={{ acceso: '', clave: '', recuerdame: true }}
                            onFinish={onFinish}
                        >
                            {
                                !error
                                    ? <></>
                                    :
                                    <Alert
                                        description={error}
                                        type="warning"
                                        showIcon
                                        style={{ borderLeftWidth: 8, marginBottom: 16 }}
                                    />
                            }
                            <Flex vertical style={{ ...bgBlack, marginBottom: 16 }}>
                                <Form.Item name="acceso" rules={[{ required: true, message: 'El usuario es obligatorio', }]} style={{ marginBottom: 10 }}>
                                    <Flex vertical>
                                        <Flex align="center" justify="space-between">
                                            <Typography.Title level={5} style={{ margin: 0, fontWeight: 'lighter', fontSize: 20, color: 'white' }}>Usuario</Typography.Title>
                                            <IconUser style={{ color: 'white', fontSize: 26 }} />
                                        </Flex>
                                        <Input
                                            name="acceso"
                                            autoComplete="off"
                                            variant="borderless"
                                            readOnly={false}
                                            style={inputStyle} />
                                    </Flex>
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={{ ...bgBlack, marginBottom: 16 }}>
                                <Form.Item name="clave" rules={[{ required: true, message: 'La clave es obligatoria' }]} style={{ marginBottom: 10 }}>
                                    <Flex vertical>
                                        <Flex align="center" justify="space-between">
                                            <Typography.Title level={5} style={{ margin: 0, fontWeight: 'lighter', fontSize: 20, color: 'white' }}>Clave</Typography.Title>
                                            <IconLock style={{ color: 'white', fontSize: 26 }} />
                                        </Flex>
                                        <Input.Password
                                            name="clave"
                                            autoComplete="off"
                                            variant="borderless"
                                            readOnly={false}
                                            style={inputStyle} />
                                    </Flex>
                                </Form.Item>
                            </Flex>
                            <Flex vertical style={bgBlack} gap={10}>
                                <Button block size="large" variant="solid" color="cyan" shape="round" htmlType="submit" loading={procesando} disabled={procesando}>
                                    {procesando ? <span>Validando, espere...</span> : <span>Iniciar Sesi&oacute;n</span>}
                                </Button>
                                <Form.Item name="recuerdame" valuePropName="checked" noStyle>
                                    <Checkbox style={{ color: 'white', fontSize: '120%' }}>Recuerdame</Checkbox>
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Col>

                </Col>
            </Flex>
        </Layout >
    )
}