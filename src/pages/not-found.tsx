import { ButtonPrimary } from "@components/buttons";
import { Urls } from "@hooks/useConstants";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {

    const nav = useNavigate();

    return (
        <Result
            status="404"
            title="Opps!"
            subTitle="Lo sentimos, la función solicitada no existe."
            extra={<ButtonPrimary onClick={() => { nav(Urls.Home, { replace: true }) }}>Ir al Inicio</ButtonPrimary>}
        />
    )
}