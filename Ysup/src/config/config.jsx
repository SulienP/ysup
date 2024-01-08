import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";

const Ways = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Ways;