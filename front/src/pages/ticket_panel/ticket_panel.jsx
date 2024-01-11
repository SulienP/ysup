import './ticket_panel.css';
import '../../styles/global.css';
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
import { TicketPanelComp } from '../../components/ticket_panel_comp/ticket_panel_comp';

const TicketPanel = () => {
    const path = window.location.href.split('/')
    const ticketId = path[path.length - 1]
    return (
        <>
            <HeaderPage />
            <TicketPanelComp ticketId={ticketId} />
            <FooterPage />
        </>
    )
}

export default TicketPanel;