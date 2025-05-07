export const appUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_URL_PROD
    : import.meta.env.VITE_APP_URL_DEV;
export const secretKey = 'D7B9F2FD64B04F18B4D1EC4869FC52BA';

export const Urls = {
    Home: '/',
    Dashboard: '/dash',
    Login: '/login',
    Seguridad: {
        Base: 'seguridad',
        Roles: 'roles',
        Permisos: 'permisos',
        PermisosFormulario: 'permisos/formulario',
        Usuarios: 'usuarios',
        Validar: 'validar',
        CambiarClave: 'cambioClave',
    },
}

export const Colors = {
    Primary: '#108ee9',
    Success: '#87d068',
    Secondary: "#969696e0",
    Warning: '#ffd666',
    Danger: '#ff4d4f',
    White: "#FFFFFF",
    Gris51: '#515151',
    Azul: '#001529',
}

