import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import HeaderPage from "../../components/header/header";
import ComponentsTicket from "../../components/ticket/ticket";
import FooterPage from '../../components/footer/footer';

const HomePage = () => {
    const [permissions, setPermissions] = useState("");
    const [errorMsg, SetErrorMsg] = useState("");
    const [cookieJwt, setCookieJwt] = useState("");
    
    useEffect(() => {
        setCookieJwt(getCookie());
        const getPerm = async (cookieJwt) => {
            await axios.post(apiUrl + 'isjwtvalid', { "jwt": cookieJwt }).then((response) => {
                setPermissions(response.data.permission);
            }).catch((err) => {
                SetErrorMsg(err);
            })
        }
        getPerm(cookieJwt);
    }, [cookieJwt]);

    return (
        <div>
            <HeaderPage/>
            <ComponentsTicket/>
            <FooterPage/>
        </div>
    )
};

export default HomePage;