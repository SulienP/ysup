import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";
import HomeUserPage from "../pages/homeUser/homeUser"
import LoginPage from "../pages/login/login_page";
import CreateTicketPage from "../pages/create_ticket/create_ticket_page";

const Ways = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/homeUser" element={<HomeUserPage/>}/>
                <Route path="*" element={<ErrorPage />}/>
                <Route path="/connexion" element={<LoginPage/>}/>
                <Route path="/create-ticket" element={<CreateTicketPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Ways;