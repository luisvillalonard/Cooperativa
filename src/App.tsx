/** CSS */
import HeaderApp from '@components/layout/header'
import MenuApp from '@components/layout/menu'
import RutasApp from '@components/layout/rutas'
import { Layout, theme } from 'antd'
import './App.css'

/* IMPORTS */

export default function App() {

  /* const { state: { user } } = useAuth() */
  const { token } = theme.useToken()

  /* if (!user) return <Outlet /> */

  return (
    <Layout className='h-100'>
      <HeaderApp />
      <Layout style={{ backgroundColor: token.colorBgContainer }}>
        <MenuApp />
        <Layout.Content className='p-4 position-relative overflow-auto'>
          <RutasApp />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
