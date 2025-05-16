import { ButtonPrimary } from '@components/buttons'
import { Container } from '@components/containers'
import Loading from '@components/loading'
import { TitlePage } from '@components/titles'
import { useEmpresas } from '@contexts/empresas/empresas'
import { useSucursales } from '@contexts/empresas/sucursales'
import { Col, Flex } from 'antd'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FormEmpresa from './formEmpresa'
import ListadoEmpresas from './listadoEmpresas'
import ListadoSucursales from './listadoSUcursales'

export default function PageEmpresas() {

    const { state: { modelo: modeloEmpresa, procesando: procesandoEmpresa, recargar: recargarEmpresas }, todos: cargarEmpresas } = useEmpresas()
    const {
        state: { procesando: procesandoSucursal, recargar: recargarSucursales },
        nuevo: nuevaSucursal, todos: cargarSucursales
    } = useSucursales()
    const url = useLocation()

    useEffect(() => { cargarEmpresas(), cargarSucursales() }, [url.pathname])
    useEffect(() => {
        if (recargarEmpresas) { cargarEmpresas() }
        if (recargarSucursales) { cargarSucursales() }
    }, [recargarEmpresas, recargarSucursales])

    return (
        <Col span={24}>
            <TitlePage title='Empresa Principal' />
            <Container style={{ marginBottom: 20 }} styles={{ body: { paddingLeft: 0, paddingRight: 0 } }}>
                <ListadoEmpresas />
            </Container>

            <Flex align='center' justify='space-between'>
                <TitlePage title='Sucursales' />
                <ButtonPrimary key='2' onClick={nuevaSucursal}>Nueva Sucursal</ButtonPrimary>
            </Flex>
            <Container styles={{ body: { paddingLeft: 0, paddingRight: 0 } }}>
                <ListadoSucursales />
            </Container>
            {!modeloEmpresa ? <></> : <FormEmpresa />}
            {/* {!modeloEmpresa ? <></> : <FormSucursal />} */}
            <Loading
                fullscreen
                active={procesandoEmpresa || procesandoSucursal}
                message='Procesando, espere...' />
        </Col>
    )
}