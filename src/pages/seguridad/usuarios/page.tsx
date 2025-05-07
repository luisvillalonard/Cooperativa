import Loading from '@components/loading'
import { useUsuarios } from '@contexts/seguridad/usuarios'
import { Col, Flex, Space, theme } from 'antd'
import Listado from './listado'
import { Container } from '@components/containers'
import { Searcher } from '@components/inputs'
import { useEffect, useState } from 'react'
import FormUsuario from './form'
import { RequestFilter } from '@interfaces/global'
import { ButtonPrimary } from '@components/buttons'
import { TitlePage } from '@components/titles'

export default function PageUsuarios() {

    const { state: { modelo, procesando, paginacion }, nuevo, todos } = useUsuarios()
    const [filtro, setFiltro] = useState<string>('')
    const { token } = theme.useToken()

    const cargarUsuarios = async () => {

        const request: RequestFilter = {
            pageSize: paginacion?.pageSize ?? 10,
            currentPage: paginacion?.currentPage ?? 1,
            filter: filtro,
        }
        await todos(request);

    }

    useEffect(() => { cargarUsuarios() }, [filtro])

    return (
        <Col span={24}>
            <TitlePage title='Usuarios' />
            <Container className='mb-3'>
                <Flex align='center' justify='space-between' gap={10}>
                    <ButtonPrimary key='2' size='large' onClick={nuevo}>Nuevo Usuario</ButtonPrimary>
                    <Space>
                        <Searcher key='1' size='large' onChange={setFiltro} style={{ borderColor: token.colorBorderSecondary }} />
                    </Space>
                </Flex>
            </Container>
            <Container>
                <Listado />
            </Container>
            {!modelo ? <></> : <FormUsuario />}
            <Loading fullscreen active={procesando} message='Procesando, espere...' />
        </Col>
    )
}