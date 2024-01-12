import { useEffect, useState } from "react";
import { apiUrl } from "../utils/constants";
import axios from "axios";
import { getCookie } from "../services/jwt_services";

const SwitchPage = ({ Element1, Element2 }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jwt = await getCookie();
                const response = await axios.post(apiUrl + "getUserGroups", {
                    jwt: jwt,
                });
                if (response.data && response.data.some(group => group.name === "Etudiant")) {
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Oups ça marche pas ¯\_(ツ)_/¯', error);
            }
        };

        fetchData();
    }, [])
    return isAdmin ? Element1 : Element2;
}

export default SwitchPage;