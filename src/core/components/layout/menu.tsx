import { useAuth } from "@contexts/seguridad/auth";
import { MenuItem } from "@interfaces/seguridad";
import { Layout, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* const headerStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 'bolder',
} */

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}

export const menuItems: MenuItem[] = []

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
}

const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

export default function MenuApp() {

    const url = useLocation()
    const { state: { user, showMenu } } = useAuth()
    const [items, setItems] = useState<MenuItem[] | undefined>(undefined)
    const [stateOpenKeys, setStateOpenKeys] = useState([''])
    const [current, setCurrent] = useState<string>('')
    const nav = useNavigate()
    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100%',
    }

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        nav(e.key, { replace: true });
    }

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    }

    useEffect(() => {
        if (user && user.rol) {
            const permissions = menuItems.reduce((acc: MenuItem[], parent: MenuItem) => {

                let children: MenuItem[] = [];
                parent.children?.forEach(child => {
                    if (user.rol?.permisos.filter(perm => perm.menuId === child.menuid).shift()) {
                        children.push(child);
                    }
                })
                acc.push({ ...parent, children: children });
                return acc;
            }, []);
            setItems(permissions.filter(opt => opt.children && opt.children.length > 0));
        }
    }, [user])

    useEffect(() => {
        const path = url.pathname.startsWith('/') ? url.pathname.slice(1, url.pathname.length) : url.pathname;
        const openKey = path.split('/')[0];
        setStateOpenKeys([openKey]);

        const allKeys = menuItems.reduce((acc: string[], item: MenuItem) => {
            const keys = item.children && item.children.map(child => child.key)
            if (keys) {
                acc.push(...keys)
            }
            return acc;
        }, []);
        const newCurrent = allKeys.filter(old => path.includes(old)).shift()
        if (newCurrent) {
            setCurrent(newCurrent);
        } else {
            setCurrent(path);
        }
    }, [url.pathname])

    if (!user || !user.rol || user.rol.permisos.length === 0) {
        return <></>
    }

    return (
        <Layout.Sider
            width={250}
            trigger={null}
            collapsible
            collapsed={!showMenu}
            style={siderStyle}>
            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={[current]}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                onClick={onClick}
                items={items}
                style={{ height: '100%', borderRight: 0, overflow: 'auto' }}
            />
        </Layout.Sider>
    )

}