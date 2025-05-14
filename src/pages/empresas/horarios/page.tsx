import { ButtonPrimary } from '@components/buttons'
import { Container, ContainerCommands } from '@components/containers'
import { Searcher } from '@components/inputs'
import Loading from '@components/loading'
import { TitlePage } from '@components/titles'
import { useHorarios } from '@contexts/empresas/horarios'
import { RequestFilter } from '@interfaces/global'
import { Col, Flex, Space, theme } from 'antd'
import { useEffect, useState } from 'react'
import FormUsuario from './form'
import Listado from './listado'

export default function PageHorarios() {

    const { state: { modelo, procesando, paginacion }, nuevo, todos } = useHorarios()
    const [filtro, setFiltro] = useState<string>('')
    theme.useToken()

    const cargarHorarios = async () => {

        const request: RequestFilter = {
            pageSize: paginacion?.pageSize ?? 10,
            currentPage: paginacion?.currentPage ?? 1,
            filter: filtro,
        }
        await todos(request);

    }

    useEffect(() => { cargarHorarios() }, [filtro])

    return (
        <Col span={24}>
            <TitlePage title='Horarios de Trabajo' />
            <ContainerCommands className='mb-3'>
                <Flex align='center' justify='space-between'>
                    <Space>
                        <Searcher key='1' onChange={setFiltro} />
                    </Space>
                    <ButtonPrimary key='2' onClick={nuevo}>Nuevo Horario</ButtonPrimary>
                </Flex>
            </ContainerCommands>
            <Container styles={{ body: { paddingLeft: 0, paddingRight: 0 } }}>
                <Listado />
            </Container>
            {!modelo ? <></> : <FormUsuario />}
            <Loading fullscreen active={procesando} message='Procesando, espere...' />
        </Col>
    )
}