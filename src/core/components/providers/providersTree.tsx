import { ContextsProviders } from "@components/providers/contexts";
import EmpleadosProvider from "@contexts/empresas/empleados";
import EmpresasProvider from "@contexts/empresas/empresas";
import HorariosProvider from "@contexts/empresas/horarios";
import PosicionesProvider from "@contexts/empresas/posiciones";
import AuthProvider from "@contexts/seguridad/auth";
import PermisosProvider from "@contexts/seguridad/permisos";
import UsuariosProvider from "@contexts/seguridad/usuarios";

const ContextsProvidersTree = ContextsProviders([

    /* Empresas */
    [HorariosProvider, {}],
    [PosicionesProvider, {}],
    [EmpleadosProvider, {}],
    [EmpresasProvider, {}],

    /* Seguridad */
    [AuthProvider, {}],
    [PermisosProvider, {}],
    [UsuariosProvider, {}],

]);
export default ContextsProvidersTree;