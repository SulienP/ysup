import { useState,useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import "../../styles/global.css";
import "./login_comp.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../services/jwt_services";

export const LoginComp = () => {
  const [emailController, setEmailController] = useState("");
  const [pwd1Controller, setPwd1Controller] = useState("");
  const [pwd2Controller, setPwd2Controller] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (getCookie() && getCookie().length > 0) {
          const response = await axios.post(apiUrl + "getUserGroups", {
            jwt: getCookie(),
          });
          if (response) {
            console.log(true)
            navigate('/')
          } else {
            navigate('/connexion')
          }
        } else {
          navigate('/connexion')
        }
      } catch (error) {
        console.error('Error checking authentication:', error.message);
        navigate('/connexion')
      }
    };

    checkAuthentication();
  }, []);

  const submitLogin = async () => {
    if (pwd1Controller != pwd2Controller) {
      setErrorMsg("Les mots de passe sont différents !");
    } else {
      setErrorMsg(false);
      await axios
        .post(apiUrl + "isuservalid", {
          email: emailController,
          password: pwd1Controller,
        })
        .then((response) => {
          if (response.data.exist === false) {
            setErrorMsg("L'utilisateur n'est pas valide");
          } else {
            setErrorMsg(null);
            const expires = new Date();
            expires.setTime(expires.getTime() + 60 * 60 * 4000); // 1h
            document.cookie = `jwt=${response.data.jwt};expires=${expires.toUTCString()};path=/`;
            navigate("/");
          }
        })
        .catch(() => {
          setErrorMsg("Une erreur est apparue durant la connexion.");
        });
    }
  };

  return (
    <main className="container_log_form columnContainer">
      <h1 className="title_form">Connectez-vous</h1>
      <h5 className="subtitle_form">
        Candidats, Etudiants, Professeurs et Entreprises : accédez aux outils et
        services Ynov Campus à l'aide de votre Compte Ynov !{" "}
      </h5>
      <div className="columnContainer container_inputs_log">
        <input
          className="input_form"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmailController(e.target.value);
          }}
        />
        <input
          className="input_form"
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={(e) => {
            setPwd1Controller(e.target.value);
          }}
        />
        <input
          className="input_form"
          type="password"
          placeholder="Confirmer votre mot de passe"
          onChange={(e) => {
            setPwd2Controller(e.target.value);
          }}
        />
      </div>
      {errorMsg && <p className="error_msg">{errorMsg}</p>}
      <button className="submit_form_log" onClick={submitLogin}>
        Se connecter
      </button>
    </main>
  );
};
