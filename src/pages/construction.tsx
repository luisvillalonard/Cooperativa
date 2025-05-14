import { ButtonSuccess } from "@components/buttons";
import { Urls } from "@hooks/useConstants";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function PageConstruccion() {

    const nav = useNavigate();

    return (
        <Result
            status="warning"
            title="En Construcci&oacute;n"
            subTitle="Fuera de servicio, la funci&oacute;n solicitada no est&aacute; disponibe en estos momentos."
            extra={<ButtonSuccess onClick={() => { nav(Urls.Home, { replace: true }) }}>Ir al Inicio</ButtonSuccess>}
        />
    )
}