import "./ticket.css";
import '../../styles/global.css';
import ArrowTicket from "../../assets/Images/arrow_forward.svg";
import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/logoProfile.png";
import { useNavigate } from "react-router-dom";

const ComponentsTicket = ({ ticketId, firstname, lastname, tagName, group, title, status, date, profilePicture }) => {
    const [colorStatus, setColorStatus] = useState("");
    const navigate = useNavigate();
    const getColorStatus = () => {
        switch (status) {
            case 1:
                setColorStatus("#9B9B9B")
                break
            case 2:
                setColorStatus("#1B91D3")
                break
            case 3:
                setColorStatus("#088A25")
                break

        }
    }
    useEffect(() => {
        getColorStatus();
    }, [colorStatus])


    return (
        <div className="ticketComp" >
            <div className="header-ticket rowContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="6" r="6" fill={colorStatus} />
                </svg>
                <h4>{title}</h4>
            </div>
            <div className="contenant-ticket rowContainer">
                <ul>
                    <li><p>Informations :</p></li>
                    <li className="ticket_length"><p>Numéro ticket :</p>{ticketId}</li>
                    <li><p>Date :</p> {date}</li>
                    <li><p>Catégorie :</p>{tagName}</li>
                </ul>
                <ul>
                    <li>
                        <p>Envoyé par :</p>
                        <img src={profilePicture != "" ? profilePicture : logo}></img>
                    </li>
                    <li><p>Nom :</p> {lastname}</li>
                    <li><p>Prénom :</p> {firstname}</li>
                    <li><p>Groupe :</p> {group}</li>
                </ul>
            </div>
            <div className="footer-ticket rowContainer">
                <button className="rowContainer alignCenter" onClick={()=>navigate(`/ticket-panel/${ticketId}`)}>
                    Répondre
                    <img className="btn_answer" src={ArrowTicket} />
                </button>
                <div className="footer-img-profile">
                    <img src={logo}></img>
                    <img src={logo}></img>
                    <img src={logo}></img>
                </div>
            </div>
        </div>
    )
};

export default ComponentsTicket;