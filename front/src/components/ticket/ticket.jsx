import "./ticket.css";
import '../../styles/global.css';
import ArrowTicket from "../../assets/Images/arrow_forward.svg";
import React from "react";
import logo from "../../assets/Images/logoProfile.png";

const ComponentsTicket = () => {
    return (
        <div className="ticket">
            <div className="header-ticket">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="6" r="6" fill="#9B9B9B"/>
                </svg>
                <h4>Motif{/* Donné */}</h4>
            </div>
            <div className="contenant-ticket">
                <ul>
                    <li><p>Informations :</p></li>
                    <li><p>Numéro ticket :</p> 6516{/* Donné */}</li>
                    <li><p>Date :</p> {/* Donné */}</li>
                    <li><p>Catégorie :</p> {/* Donné */}</li>
                </ul>
                <ul>
                    <li><p>Envoyer par :</p> 
                        <img src={logo}></img>
                    </li>
                    <li><p>Nom :</p> {/* Donné */}</li>
                    <li><p>Prénom :</p> {/* Donné */}</li>
                    <li><p>Groupe :</p> {/* Donné */}</li>
                </ul>
            </div>
            <div className="footer-ticket">
                <button>Répondre
                    <img src={ArrowTicket}/>
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