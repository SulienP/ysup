import { CreateTicketComp } from "../../components/create_ticket/create_ticket";
import FooterPage from "../../components/footer/footer";
import HeaderPage from "../../components/header/header";

const CreateTicketPage = () => {
    return (
        <>
            <HeaderPage />
            <CreateTicketComp />
            <FooterPage />
        </>
    )
}

export default CreateTicketPage;