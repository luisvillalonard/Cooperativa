export const appUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_URL_PROD
    : import.meta.env.VITE_APP_URL_DEV;
export const secretKey = 'D7B9F2FD64B04F18B4D1EC4869FC52BA';

export const Urls = {
    Home: '/',
    Dashboard: '/dash',
    Login: '/login',
    Auxiliares: {
        Generos: 'generos',
        Billetes: 'billetes',
    },
    Empresas: {
        Base: 'empresas',
        Horarios: 'horarios',
        Posiciones: 'posiciones',
        Empleados: 'empleados',
        Empresas: 'todas',
    },
    Socios: {},
    AhorrosRetiros: {},
    Prestamos: {},
    Recibos: {},
    Contabilidad: {},
    Configuraciones: {
        Provincias: 'provincias',
        Municipios: 'municipios',
    },
    Seguridad: {
        Base: 'seguridad',
        Roles: 'roles',
        Permisos: 'permisos',
        PermisosFormulario: 'permisos/formulario/:id?',
        Usuarios: 'usuarios',
        Validar: 'validar',
        CambiarClave: 'cambioClave',
    },
    Reportes: {},
}

export const Colors = {
    Primary: '#108ee9',
    Success: '#87d068',
    Secondary: "#969696e0",
    Warning: '#ffd666',
    Danger: '#ff4d4f',
    White: "#FFFFFF",
    Black: 'rgb(25,25,25)',
    Gris51: '#515151',
    Azul: '#001529',
}

