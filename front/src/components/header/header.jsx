import "./header.css";
import '../../styles/global.css';
import { Link } from "react-router-dom";

const HeaderPage = () => {
    const clearCookies = () => {
        document.cookie.split(';').forEach((cookie) => {
            const [name] = cookie.split('=');
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        });
    }
    return (
        <header className="header-wrapper rowContainer">
            <div className="header">
                <Link to={'/'} className="button-logo">
                    <img className="logo" src="/logo_ynov_campus_rvb_blanc.png" alt="Page de ticket Ynov" />
                </Link>
                <div className="rowContainer">
                    <Link className="button-ticket rowContainer alignCenter" to={"/create-ticket"}>
                        Creation ticket
                    </Link>
                    <Link onClick={clearCookies} to={'/connexion'} className="button-avatar" aria-haspopup="true">
                        <img className="user-avatar" src="/logoProfile.png" />
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default HeaderPage;