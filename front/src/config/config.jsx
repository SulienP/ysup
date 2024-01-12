import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ErrorPage from "../pages/error/error";
import HomePage from "../pages/home/home";
import HomeUserPage from "../pages/homeUser/homeUser";
import LoginPage from "../pages/login/login_page";
import CreateTicketPage from "../pages/create_ticket/create_ticket_page";
import TicketPanel from "../pages/ticket_panel/ticket_panel";
import AuthRoute from "./auth_route";
import { Fragment } from "react";

const Ways = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route  path="/" element={<AuthRoute />} >
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/home-user" element={<HomeUserPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/create-ticket" element={<CreateTicketPage />} />
          <Route path="/ticket-panel/*" element={<TicketPanel />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default Ways;
