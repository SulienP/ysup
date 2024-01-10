import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";

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
            <h1>Home</h1>
            <p>{permissions}</p>
        </div>
    )
};

export default HomePage;