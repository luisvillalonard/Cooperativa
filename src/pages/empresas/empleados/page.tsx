import { ButtonPrimary } from '@components/buttons'
import { Container, ContainerCommands } from '@components/containers'
import { Searcher } from '@components/inputs/searcher'
import Loading from '@components/loading'
import { TitlePage } from '@components/titles'
import { RequestFilter } from '@interfaces/global'
import { Col, Flex, Space } from 'antd'
import { useEffect, useState } from 'react'
import FormEmpleado from './form'
import Listado from './listado'
import { useLocation } from 'react-router-dom'
import { useEmpleados } from '@contexts/empresas/empleados'

export default function PageEmpleados() {

    const { state: { modelo, procesando, paginacion, recargar }, nuevo, todos } = useEmpleados()
    const [filtro, setFiltro] = useState<string>('')
    const url = useLocation()

    const cargarEmpleados = async () => {

        const request: RequestFilter = {
            pageSize: paginacion?.pageSize ?? 10,
            currentPage: paginacion?.currentPage ?? 1,
            filter: filtro,
        }
        await todos(request);

    }

    useEffect(() => { cargarEmpleados() }, [url.pathname, filtro])
    useEffect(() => { if (recargar) { cargarEmpleados() } }, [recargar])

    return (
        <Col span={24}>
            <TitlePage title='Empleados' />
            <ContainerCommands className='mb-3'>
                <Flex align='center' justify='space-between'>
                    <Space>
                        <Searcher key='1' onChange={setFiltro} />
                    </Space>
                    <ButtonPrimary key='2' onClick={nuevo}>Nuevo Empleado</ButtonPrimary>
                </Flex>
            </ContainerCommands>
            <Container styles={{ body: { paddingLeft: 0, paddingRight: 0 } }}>
                <Listado />
            </Container>
            {!modelo ? <></> : <FormEmpleado />}
            <Loading fullscreen active={procesando} message='Procesando, espere...' />
        </Col>
    )
}