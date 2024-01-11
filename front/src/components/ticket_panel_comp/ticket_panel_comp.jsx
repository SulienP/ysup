import './ticket_panel_comp.css';
import '../../styles/global.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const TicketPanelComp = ({ ticketId }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(1);
    const [ticketInfos, setTicketInfos] = useState([]);
    const [isEditingTag, setIsEditingTag] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const getTicketInfos = async (ticketId) => {
            await axios.post(apiUrl + 'getoneticket', { idTicket: ticketId }).then((response) => {
                setTicketInfos(response.data);
            }).catch((err) => {
                setErrMsg(err.message);
            })
        }
        const getTags = async () => {
            await axios.get(apiUrl + "getalltags").then((response) => {
                setTags(response.data);
            });
        };
        getTags();
        getTicketInfos(ticketId);
    }, [])



    const closeTicket = async () => {
        await axios.put(apiUrl + 'updateTicketStatus', { idTicket: ticketId, status: 3 }).then(() => {
            navigate('/');
        }).catch((err) => setErrMsg("Error while trying to close the ticket"))
    }

    const handleEditTag = async () => {
        setIsEditingTag(false);
        await axios.put(apiUrl + "updateTicketTag", { idTicket: ticketId, idTag: selectedTag }).then(() => {
            window.location.reload();
        }).catch((err) => {
            setErrMsg(err.message);
        })

    }

    return (
        ticketInfos.length > 0 ? (
            < main className='container_ticketpanel_page rowContainer ' >
                <section className='ticket columnContainer'>
                    <h2 className='user_title'>
                        {ticketInfos[0].firstname + ' ' + ticketInfos[0].lastname}
                    </h2>
                    <div className='motif_ticket rowContainer'>
                        <h3>Catégorie : </h3>
                        <h3 className='motif_ticket_bold'>{ticketInfos[0].name}</h3>
                    </div>
                    <div className='motif_ticket rowContainer'>
                        <h3>Motif : </h3>
                        <h3 className='motif_ticket_bold'>{ticketInfos[0].title}</h3>
                    </div>
                    <p className='content_ticket'>
                        {ticketInfos[0].content}
                    </p>
                </section>
                <section className='columnContainer container_panel_btn'>
                    <button onClick={()=>closeTicket()} className='btn_ticket_panel btn_close_ticket'>
                        Fermer ticket
                    </button>
                    {isEditingTag ? <button onClick={handleEditTag} className='btn_ticket_panel btn_green_ticket'>
                        Valider
                    </button> : <button onClick={() => setIsEditingTag(true)} className='btn_ticket_panel btn_green_ticket'>
                        Modifier catégorie
                    </button>}
                    {isEditingTag && <select
                        required
                        className="select_tag_menu"
                        name="tags"
                        value={selectedTag}
                        onChange={(e) => {
                            setSelectedTag(e.target.value);
                        }}
                    >
                        <option disabled>selectionner</option>
                        {tags.map((tag, index) => (
                            <option key={index} value={tag.idTag}>
                                {tag.name}
                            </option>
                        ))}
                    </select>}
                    <button disabled className='btn_ticket_panel btn_green_ticket'>
                        Rejoindre
                    </button>
                    <textarea className='textarea_response' placeholder='Entrez une réponse' name="response" cols="30" rows="10" />
                    <button  className='btn_ticket_panel btn_response_ticket'>Répondre</button>
                </section>
            </main >)
            : <p className='error_msg_panel'>{errMsg}</p>
    )
}