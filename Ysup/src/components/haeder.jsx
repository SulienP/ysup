import "../styles/header.css";
import "../styles/global.css";

const HeaderPage = () => {
    return (
        <div className="header-wrapper">
            <header className="header">
                <img className="logo" src="/logo_ynov_campus_rvb_blanc.png" alt="Page de ticket Ynov"/>
                <div className="">
                    <button className="button-ticket">
                        <a>Creation ticket</a>
                    </button>
                    <button className="button-avatar" aria-haspopup="true">
                        <img className="user-avatar" src="/logoProfile.png"/>
                    </button>
                </div>
            </header>
        </div>
    )
};

export default HeaderPage;