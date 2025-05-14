import { useAuth } from '@contexts/seguridad/auth'
import { Urls } from '@hooks/useConstants'
import PageConstruccion from '@pages/construction'
import PageHorarios from '@pages/empresas/horarios/page'
import PageHome from '@pages/home'
import PageNotFound from '@pages/not-found'
import PageLogin from '@pages/seguridad/login/page'
import FormPermisos from '@pages/seguridad/permisos/form'
import PageUsuarios from '@pages/seguridad/usuarios/page'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import PagePermisos from '../../../pages/seguridad/permisos/page'

const RoutesAuthenticate = () => {

    const { state: { user } } = useAuth();

    if (user) return <Navigate to={Urls.Login} replace />

    return <Outlet />
}

export const RoutesPrivate = () => {

    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path={'/login'} element={<PageLogin />} />
            <Route element={<RoutesAuthenticate />}>
                <Route path={'/'} element={<PageHome />} />
                <Route path={`${Urls.Seguridad.Base}/${Urls.Seguridad.Usuarios}`} element={<PageUsuarios />} />
                <Route path={Urls.Empresas.Base}>
                    <Route path={Urls.Empresas.Horarios} element={<PageHorarios />} />
                    <Route path={Urls.Empresas.Posiciones} element={<PageConstruccion />} />
                    <Route path={Urls.Empresas.Empleados} element={<PageConstruccion />} />
                    <Route path={Urls.Empresas.Sucursales} element={<PageConstruccion />} />
                    <Route path={Urls.Empresas.DatosGenerales} element={<PageConstruccion />} />
                </Route>
                <Route path={Urls.Seguridad.Base}>
                    <Route path={Urls.Seguridad.Permisos} element={<PagePermisos />} />
                    <Route path={Urls.Seguridad.PermisosFormulario} element={<FormPermisos />} />
                    <Route path={Urls.Seguridad.Usuarios} element={<PageUsuarios />} />
                </Route>
            </Route>
        </Routes>
    )

}
