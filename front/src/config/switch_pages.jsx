import { useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
import axios from "axios";
import { getCookie } from "../services/jwt_services";

const SwitchPage = ({ Element1, Element2 }) => {
    console.log("atuh")
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        axios.post(apiUrl + "getUserGroups", {
            jwt: getCookie(),
        }).then((response) => {
            console.log(response.data);
            if (response.data && (response.data).some(group => group.name === "Student")) {
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
        });
    }, [getCookie])
    return isAdmin ? Element1 : Element2;
}

export default SwitchPage;