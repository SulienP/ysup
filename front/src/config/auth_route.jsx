import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { apiUrl } from "../utils/constants";
import { useState, useEffect } from "react";
import React from "react";
import { getCookie } from "../services/jwt_services";
import LoginPage from "../pages/login/login_page";

const AuthRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (getCookie().length > 0) {
          const response = await axios.post(apiUrl + "getUserGroups", {
            jwt: getCookie(),
          });
          if (response) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [getCookie]);

  return isAuthenticated ? <Outlet /> : <LoginPage />;
};

export default AuthRoute;
