import { ButtonPrimary } from "@components/buttons"
import { Container } from "@components/containers"
import Loading from "@components/loading"
import { TitlePage } from "@components/titles"
import { usePermisos } from "@contexts/seguridad/permisos"
import { Urls } from "@hooks/useConstants"
import { Col, Flex } from "antd"
import { useNavigate } from "react-router-dom"
import Listado from "./listado"

export default function PagePermisos() {

    const { state: { procesando } } = usePermisos()
    const nav = useNavigate()

    const onNew = () => {
        nav(`/${Urls.Seguridad.Base}/${Urls.Seguridad.PermisosFormulario.replace(':id?', '')}`, { replace: true });
    }

    return (
        <Col span={24}>
            <Flex align='center' justify='space-between' className="mb-3">
                <TitlePage title="Permisos" />
                <ButtonPrimary key='2' size='large' onClick={onNew}>Nuevo Perf&iacute;l de Usuario</ButtonPrimary>
            </Flex>

            <Container>
                <Listado />
            </Container>

            <Loading active={procesando} message="Procesando, espere..." />
        </Col>
    )
}