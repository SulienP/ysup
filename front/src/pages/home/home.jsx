import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import HeaderPage from "../../components/header/header";
import ComponentsTicket from "../../components/ticket/ticket";
import FooterPage from '../../components/footer/footer';
import CategorieComp from "../../components/categorie/categorie_comp";
import searcheLogo from "../../assets/Images/search_logo.svg";
import "./home.css";

const HomePage = () => {
    const [permissions, setPermissions] = useState("");
    const [errorMsg, SetErrorMsg] = useState("");
    const [cookieJwt, setCookieJwt] = useState("");
    const [tickets, setTickets] = useState([]);
    const [searchContent, setSearchContent] = useState("");
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [tags, setTags] = useState([]);

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

    useEffect(() => {
        axios.post(apiUrl + 'getAllTickets', { tag: 1 })
            .then((response) => {
                setTickets(response.data)
                setFilteredTickets(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                SetErrorMsg(err.message);
            })
        axios.get(apiUrl + "getAllTags").then((response) => {
            setTags(response.data)
        }).catch((err) => {
            SetErrorMsg(err.message);
        })
    }, [])

    const handleSearch = () => {
        const filteredResults = tickets.filter(ticket => {
            const fullName = `${ticket.firstname} ${ticket.lastname}`;
            return fullName.toLowerCase().includes(searchContent.toLowerCase());
        });
        setFilteredTickets(filteredResults);
    }

    const handleSwitchTag = (data) => {
        axios.post(apiUrl + 'getAllTickets', { tag: data })
            .then((response) => {
                setTickets(response.data)
                setFilteredTickets(response.data);
            })
            .catch((err) => {
                SetErrorMsg(err.message);
            })
    }

    useEffect(() => {
        handleSearch();
    }, [searchContent]);

    return (
        <div className="home columnContainer">
            <HeaderPage />
            <div className="nav-categorie">
                {tags.map((tag, index) => (
                    <CategorieComp key={index} onclick={handleSwitchTag} idTag={tag.idTag} name={tag.name} />
                ))}
            </div>
            <div className="separator"></div>
            <div className="search_container rowContainer ">
                <img src={searcheLogo} />
                <input type="text" onChange={(e) => { setSearchContent(e.target.value) }} placeholder="Rechercher ..." />
            </div>
            <div className="ticket">
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket, index) => {
                        if (ticket.status !== 3) {
                            <ComponentsTicket
                                key={index}
                                ticketId={ticket.idTicket}
                                firstname={ticket.firstname}
                                lastname={ticket.lastname}
                                tagName={ticket.name}
                                group={ticket.group}
                                title={ticket.title}
                                profilePicture={ticket.file}
                                status={ticket.status}
                                date={ticket.dates}
                            />
                        }
                    })
                ) : (
                    <p className="errorMsgText">No matching tickets found.</p>
                )}
            </div>
            <FooterPage />
        </div>
    )
};

export default HomePage;