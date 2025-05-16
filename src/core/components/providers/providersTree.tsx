import { ContextsProviders } from "@components/providers/contexts";
import BilletesProvider from "@contexts/auxiliares/billetes";
import GenerosProvider from "@contexts/auxiliares/generos";
import MunicipiosProvider from "@contexts/configuraciones/municipios";
import ProvinciasProvider from "@contexts/configuraciones/provincias";
import EmpleadosProvider from "@contexts/empresas/empleados";
import EmpresasProvider from "@contexts/empresas/empresas";
import HorariosProvider from "@contexts/empresas/horarios";
import PosicionesProvider from "@contexts/empresas/posiciones";
import SucursalesProvider from "@contexts/empresas/sucursales";
import AuthProvider from "@contexts/seguridad/auth";
import PermisosProvider from "@contexts/seguridad/permisos";
import UsuariosProvider from "@contexts/seguridad/usuarios";

const ContextsProvidersApps = ContextsProviders([

    /* Auxiliares */
    [GenerosProvider, {}],
    [BilletesProvider, {}],

    /* Empresas */
    [HorariosProvider, {}],
    [PosicionesProvider, {}],
    [EmpleadosProvider, {}],
    [EmpresasProvider, {}],
    [SucursalesProvider, {}],

    /* Socios */
    /* Ahorros y Retiros */
    /* Prestamos */
    /* Recibos */
    /* Contabilidad */
    /* Configuraciones */
    [ProvinciasProvider, {}],
    [MunicipiosProvider, {}],

    /* Seguridad */
    [AuthProvider, {}],
    [PermisosProvider, {}],
    [UsuariosProvider, {}],

    /* Reportes */

]);
export default ContextsProvidersApps;