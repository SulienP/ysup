import "./header.css";
import '../../styles/global.css';
import { Link } from "react-router-dom";

const HeaderPage = () => {
    return (
        <header className="header-wrapper rowContainer">
            <div className="header">
                <button className="button-logo">
                    <img className="logo" src="/logo_ynov_campus_rvb_blanc.png" alt="Page de ticket Ynov" />
                </button>
                <div className="rowContainer">
                    <Link className="button-ticket rowContainer alignCenter" to={"/create-ticket"}>
                        Creation ticket
                    </Link>
                    <button className="button-avatar" aria-haspopup="true">
                        <img className="user-avatar" src="./src/assets/Images/logoProfile.png" />
                    </button>
                </div>
            </div>
        </header>
    )
};

export default HeaderPage;