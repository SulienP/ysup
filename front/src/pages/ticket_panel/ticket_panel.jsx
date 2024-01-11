import './ticket_panel.css';
import '../../styles/global.css';
import HeaderPage from "../../components/header/header";
import FooterPage from "../../components/footer/footer";
import { TicketPanelComp } from '../../components/ticket_panel_comp/ticket_panel_comp';

const TicketPanel = ({idTicket}) => {
    return (
        <>
            <HeaderPage />
            <TicketPanelComp ticketId={'8e34aed2-c1a4-43c9-85e1-5a1d758740e6'}/>
            <FooterPage />
        </>
    )
}

export default TicketPanel;