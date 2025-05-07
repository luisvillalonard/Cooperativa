import { ContextsProviders } from "@components/providers/contexts";
import AuthProvider from "@contexts/seguridad/auth";
import UsuariosProvider from "@contexts/seguridad/usuarios";

const ContextsProvidersTree = ContextsProviders([

    /* Seguridad */
    [AuthProvider, {}],
    [UsuariosProvider, {}],

]);
export default ContextsProvidersTree;