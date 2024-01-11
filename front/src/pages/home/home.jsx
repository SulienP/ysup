import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import HeaderPage from "../../components/header/header";
import ComponentsTicket from "../../components/ticket/ticket";
import FooterPage from '../../components/footer/footer';
import RechercheComp from "../../components/recherche/recherche_comp";
import CategorieComp from "../../components/categorie/categorie_comp";
import "./home.css";

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
        <div className="home">
            <HeaderPage/>
            <div className="nav-categorie">
                <CategorieComp/>
                <CategorieComp/>
            </div>
            <div className="separator"></div>
            <RechercheComp/>
            <div className="ticket">
                <ComponentsTicket/>
                <ComponentsTicket/>
                <ComponentsTicket/>
                <ComponentsTicket/>
                <ComponentsTicket/>
                <ComponentsTicket/>
            </div>
            <FooterPage/>
        </div>
    )
};

export default HomePage;