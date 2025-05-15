/** CSS */
import HeaderApp from '@components/layout/header'
import MenuApp from '@components/layout/menu'
import { RoutesPrivate } from '@components/layout/rutas'
import { Layout } from 'antd'
import './App.css'

/* IMPORTS */

export default function App() {

  /* const { state: { user } } = useAuth() */
  /* const { token } = theme.useToken() */

  /* if (!user) {
    return (<RoutesPrivate />)
  } */

  return (
    <Layout className='h-100'>
      <HeaderApp />
      <Layout style={{ backgroundColor: '#f5f5f5' }}>
        <MenuApp />
        <Layout.Content className='p-4 position-relative overflow-auto'>
          <RoutesPrivate />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
