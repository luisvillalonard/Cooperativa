import Loading from "@components/containers/loading";
import { useUsuarios } from "@contexts/seguridad/usuarios";
import { Col, Flex } from "antd";

export default function PageUsuarios() {

    const { state: { procesando } } = useUsuarios()

    return (
        <Col span={24}>
            <Flex align="center" justify="space-between" className="mb-3">
                <TitlePage title="Usuarios" />
                <Space>
                    <Searcher key="1" size="large" onChange={setFilter} style={{ borderColor: token.colorBorderSecondary }} />
                    <ButtonPrimary key="2" size="large" onClick={nuevo}>Nuevo Usuario</ButtonPrimary>
                </Space>
            </Flex>
            <Container>
                <Listado filter={filter} />
            </Container>
            {!modelo ? <></> : <FormUsuario />}
            <Loading fullscreen active={procesando} message="Procesando, espere..." />
        </Col>
    )
}