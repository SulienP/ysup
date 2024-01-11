import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import HeaderPage from "../../components/header/header";
import ComponentsTicket from "../../components/ticket/ticket";
import FooterPage from '../../components/footer/footer';
import CategorieComp from "../../components/categorie/categorie_comp";
import "./homeUser.css";
import "../../styles/global.css";

const HomeUserPage = () => {
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
        <div className="homeUser">
            <HeaderPage/>
            <div className="contenant">
                <div className="myTicket">
                    <CategorieComp/>
                    <div className="separator"></div>
                    <div className="content-ticket">
                        <div className="ticketUser">
                            <ComponentsTicket/>
                            <ComponentsTicket/>
                            <ComponentsTicket/>
                            <ComponentsTicket/>
                            <ComponentsTicket/>
                            <ComponentsTicket/>
                        </div>
                    </div>
                </div>
                <div className="Affichage">
                    <p>Selectionner un element pour le lire</p>
                </div>
            </div>
            <FooterPage/>
        </div>
    )
};

export default HomeUserPage;