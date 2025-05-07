import { useAuth } from '@contexts/seguridad/auth'
import { Urls } from '@hooks/useConstants'
import PageHome from '@pages/home'
import PageNotFound from '@pages/not-found'
import PageLogin from '@pages/seguridad/login/page'
import PageUsuarios from '@pages/seguridad/usuarios/page'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const PrivateRoutes = () => {

    const { state: { user } } = useAuth();

    if (user) return <Navigate to={Urls.Login} replace />

    return <Outlet />
}

const RutasApp = () => {

    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path={'/'} element={<PageHome />} />
                <Route path={`${Urls.Seguridad.Base}/${Urls.Seguridad.Usuarios}`} element={<PageUsuarios />} />
                <Route path={Urls.Seguridad.Base}>
                    <Route path={Urls.Seguridad.Usuarios} element={<PageUsuarios />} />
                </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route path={'/login'} element={<PageLogin />} />
        </Routes>
    )

}
export default RutasApp