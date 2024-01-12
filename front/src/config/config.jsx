import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";
import HomeUserPage from "../pages/homeUser/homeUser";
import LoginPage from "../pages/login/login_page";
import CreateTicketPage from "../pages/create_ticket/create_ticket_page";
import TicketPanel from "../pages/ticket_panel/ticket_panel";
import AuthRoute from "./auth_route";
import { Fragment } from "react";
import SwitchPage from "./switch_pages";

const Ways = () => {
  
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/" element={<AuthRoute />} >
            <Route path="/" element={<SwitchPage Element1={<HomePage/>} Element2={<HomeUserPage/>} />} />
          </Route>
          <Route path="/create-ticket" element={<AuthRoute />} >
            <Route path="/create-ticket" element={<CreateTicketPage/>} />
          </Route>
          <Route path="/ticket-panel/" element={<AuthRoute />} >
            <Route path="/ticket-panel/*" element={<SwitchPage Element1={<TicketPanel/>} Element2={<HomePage/>}/>} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Fragment>
    </BrowserRouter> 
  );
};

export default Ways;
