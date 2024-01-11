import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";
import LoginPage from "../pages/login/login_page";
import CreateTicketPage from "../pages/create_ticket/create_ticket_page";
import TicketPanel from "../pages/ticket_panel/ticket_panel";

const Ways = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="*" element={<ErrorPage />}/>
                <Route path="/connexion" element={<LoginPage/>}/>
                <Route path="/create-ticket" element={<CreateTicketPage/>}/>
                <Route path="/ticket-panel/*" element={<TicketPanel/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Ways;