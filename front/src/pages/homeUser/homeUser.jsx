import { useEffect, useState } from "react";
import { getCookie } from "../../services/jwt_services";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import HeaderPage from "../../components/header/header";
import ComponentsTicket from "../../components/ticket/ticket";
import FooterPage from "../../components/footer/footer";
import CategorieComp from "../../components/categorie/categorie_comp";
import "./homeUser.css";
import "../../styles/global.css";
import { useNavigate } from "react-router-dom";

const HomeUserPage = () => {
  const [errorMsg, SetErrorMsg] = useState("");
  const [cookieJwt, setCookieJwt] = useState("");
  const [tickets, setTickets] = useState([]);
  const [tags, setTags] = useState([]);
  const [ticketPreview, setTicketPreview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCookieJwt(getCookie());
    axios
      .post(apiUrl + "getAllTicketsByUser", { jwt: getCookie() ?? "" })
      .then((response) => {
        setTickets(response.data);
        setFilteredTickets(response.data);
      })
      .catch((err) => {
        SetErrorMsg(err.message);
      });
    axios
      .get(apiUrl + "getAllTags")
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => {
        SetErrorMsg(err.message);
      });
  }, []);

  const handleSwitchTag = (data) => {
    axios
      .post(apiUrl + "getAllTicketsByUserAndTag", { tag: data, jwt: cookieJwt })
      .then((response) => {
        setTickets(response.data);
        setFilteredTickets(response.data);
      })
      .catch((err) => {
        SetErrorMsg(err.message);
      });
  };

  const getPreviewTicket = async (ticketId) => {
    axios
      .post(apiUrl + "getoneticket", { idTicket: ticketId })
      .then((response) => {
        console.log(response.data)
        setTicketPreview(response.data);
      })
      .catch((err) => {
        SetErrorMsg(err.message);
      });
  };

  const deleteTicket = async (ticketId) => {
    await axios
      .put(apiUrl + "updateTicketStatus", { idTicket: ticketId, status: 3 })
      .then(() => {
        handleSwitchTag(1)
      })
      .catch((err) => console.error("Error while trying to close the ticket"));
  }

  return (
    <div className="homeUser columnContainer">
      <HeaderPage />
      <div className="content rowContainer">
        <div className="myTickets columnContainer alignCenter">
          <div className="container_tags rowContainer alignCenter">
            {tags.map((tag, index) => (
              <CategorieComp
                key={index}
                onclick={handleSwitchTag}
                idTag={tag.idTag}
                name={tag.name}
              />
            ))}
          </div>
          <span className="separator"></span>
          <div className="tickets_container columnContainer">
            {tickets.length > 0 &&
              tickets.map((ticket, index) => {
                if (ticket.status != 3) {
                  return (
                    <span key={index} className="ticket_hover" onClick={() => getPreviewTicket(ticket.idTicket)}>
                      <ComponentsTicket
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
                    </span>
                  )
                }
              })}
          </div>
        </div>
        <div className="ticket_preview">
          {ticketPreview.length > 0 ? (
            ticketPreview.map((ticketDatas, index) => (
              <section key={index} className="container_ticket_preview">
                <article className="header_preview rowContainer">
                  <img
                    className="profile_preview"
                    src={
                      ticketDatas.image ? ticketDatas.image : "/logoProfile.png"
                    }
                    alt="profile_picture"
                  />
                  {ticketDatas.firstname} {ticketDatas.lastname}
                </article>
                <span className="separator_preview"></span>
                <article className="preview_motif rowContainer">
                  Catégorie :
                  <p className="preview_motif_bold">{ticketDatas.name}</p>
                </article>
                <span className="separator_preview"></span>
                <article className="preview_motif rowContainer">
                  Motif :
                  <p className="preview_motif_bold">{ticketDatas.title}</p>
                </article>
                <span className="separator_preview"></span>
                <article className="preview_content">
                  {ticketDatas.content}
                </article>
                <button onClick={() => deleteTicket(ticketDatas.idTicket)}>Supprimer</button>
              </section>
            ))
          ) : (
            <p className="no_preview_text alignCenter">Selectionner un element pour le lire</p>
          )}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default HomeUserPage;
