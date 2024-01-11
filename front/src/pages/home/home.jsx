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
    const [errorMsg, SetErrorMsg] = useState("");
    const [cookieJwt, setCookieJwt] = useState("");
    const [tickets, setTickets] = useState([]);
    const [searchContent, setSearchContent] = useState("");
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [tags, setTags] = useState([]);

 

    useEffect(() => {
        setCookieJwt(getCookie());
        axios.post(apiUrl + 'getAllTickets', { tag: 1 ,jwt: getCookie() ?? "" })
            .then((response) => {
                setTickets(response.data)
                setFilteredTickets(response.data);
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
        const filteredResults = tickets
            .filter(ticket => {
                const fullName = `${ticket.lastname} ${ticket.firstname}`;
                return fullName.toLowerCase().startsWith(searchContent.toLowerCase());
            })
            .sort((a, b) => {
                const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
                const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0; 
            });
    
        setFilteredTickets(filteredResults);
    };
    

    const handleSwitchTag = (data) => {
        axios.post(apiUrl + 'getAllTickets', { tag: data , jwt: cookieJwt })
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
                <input type="text" onChange={(e) => { setSearchContent(e.target.value) }} placeholder="Rechercher nom, prénom ..." />
            </div>
            <div className="ticket">
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket, index) => {
                        if (ticket.status != 3) {
                            return (
                                <ComponentsTicket
                                    key={index}
                                    ticketId={ticket.idTicket}
                                    firstname={ticket.firstname}
                                    lastname={ticket.lastname}
                                    title={ticket.title}
                                    tagName={ticket.tagName}
                                    group={ticket.groupName}
                                    profilePicture={ticket.file}
                                    status={ticket.status}
                                    date={ticket.dates}
                                />
                            )
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