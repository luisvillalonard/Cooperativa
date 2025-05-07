import { ContextsProviders } from "@components/providers/contexts";
import AuthProvider from "@contexts/seguridad/auth";
import PermisosProvider from "@contexts/seguridad/permisos";
import UsuariosProvider from "@contexts/seguridad/usuarios";

const ContextsProvidersTree = ContextsProviders([

    /* Seguridad */
    [AuthProvider, {}],
    [PermisosProvider, {}],
    [UsuariosProvider, {}],

]);
export default ContextsProvidersTree;