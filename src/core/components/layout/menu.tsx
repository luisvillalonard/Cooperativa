import { useAuth } from '@contexts/seguridad/auth'
import { usePermisos } from '@contexts/seguridad/permisos'
import { Colors } from '@hooks/useConstants'
import { MenuItem } from '@interfaces/seguridad'
import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function MenuApp() {

    const { state: { showMenu } } = useAuth()
    const { menus } = usePermisos()
    const [items, setItems] = useState<MenuItem[]>([])
    const nav = useNavigate()

    const cargarOpcionesMenu = async () => {

        const result = await menus();

        if (!result || !result.ok || !result.datos) return;

        const opciones = result.datos;
        const menuItems: MenuItem[] = opciones
            .filter(opt => opt.padre === 0)
            .sort((a, b) => a.orden - b.orden)
            .map(opt => {
                const hijos: MenuItem[] = opciones
                    .filter(child => child.padre === opt.id)
                    .map(opt => {
                        return {
                            menuid: opt.id,
                            key: opt.link!,
                            label: opt.titulo,
                        } as MenuItem
                    });
                const padre: MenuItem = {
                    menuid: opt.id,
                    key: opt.id.toString(),
                    label: opt.titulo,
                    children: hijos,
                };

                return padre;
            });
        setItems(menuItems);
        console.log('menuItems', menuItems)


    }

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('key', e.key);
        nav(e.key, { replace: true });
    }

    useEffect(() => { cargarOpcionesMenu() }, [])

    /* if (!user || !user.rol || user.rol.permisos.length === 0) {
        return <Outlet />
    }
 */
    return (
        <Layout.Sider
            width={250}
            trigger={null}
            collapsible
            collapsed={!showMenu}
            className='h-100 overflow-auto'>
            <Menu
                mode='inline'
                items={items}
                onClick={onClick}
                style={{ height: '100%', borderRight: 0, overflow: 'auto', backgroundColor: Colors.White }}
            />
        </Layout.Sider>
    )

}