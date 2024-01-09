import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";
import LoginPage from "../pages/login/login_page";

const Ways = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="*" element={<ErrorPage />}/>
                <Route path="/connexion" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Ways;