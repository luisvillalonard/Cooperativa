import { ButtonPrimary } from '@components/buttons'
import { Container, ContainerCommands } from '@components/containers'
import { Searcher } from '@components/inputs/searcher'
import Loading from '@components/loading'
import { TitlePage } from '@components/titles'
import { RequestFilter } from '@interfaces/global'
import { Col, Flex, Space } from 'antd'
import { useEffect, useState } from 'react'
import FormPosicion from './form'
import Listado from './listado'
import { usePosiciones } from '@contexts/empresas/posiciones'
import { useLocation } from 'react-router-dom'

export default function PagePosiciones() {

    const { state: { modelo, procesando, paginacion, recargar }, nuevo, todos } = usePosiciones()
    const [filtro, setFiltro] = useState<string>('')
    const url = useLocation()

    const cargarPosiciones = async () => {

        const request: RequestFilter = {
            pageSize: paginacion?.pageSize ?? 10,
            currentPage: paginacion?.currentPage ?? 1,
            filter: filtro,
        }
        await todos(request);

    }

    useEffect(() => { cargarPosiciones() }, [url.pathname, filtro])
    useEffect(() => { if (recargar) { cargarPosiciones() } }, [recargar])

    return (
        <Col span={24}>
            <TitlePage title='Posiciones de Trabajo' />
            <ContainerCommands className='mb-3'>
                <Flex align='center' justify='space-between'>
                    <Space>
                        <Searcher key='1' onChange={setFiltro} />
                    </Space>
                    <ButtonPrimary key='2' onClick={nuevo}>Nueva Posici&oacute;n</ButtonPrimary>
                </Flex>
            </ContainerCommands>
            <Container styles={{ body: { paddingLeft: 0, paddingRight: 0 } }}>
                <Listado />
            </Container>
            {!modelo ? <></> : <FormPosicion />}
            <Loading fullscreen active={procesando} message='Procesando, espere...' />
        </Col>
    )
}