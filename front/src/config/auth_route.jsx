import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { apiUrl } from "../utils/constants";
import { useState, useEffect } from "react";
import React from "react";
import { getCookie } from "../services/jwt_services";
import LoginPage from "../pages/login/login_page";

const AuthRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (getCookie().length > 0) {
          await axios.post(apiUrl + 'isjwtvalid', { jwt: getCookie() }).then((response) => {
            if (response.data) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          })
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return isAuthenticated ? <Outlet /> : <LoginPage />;
};

export default AuthRoute;
