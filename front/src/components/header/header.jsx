import "./header.css";
import '../../styles/global.css';

const HeaderPage = () => {
    return (
        <div className="header-wrapper">
            <header className="header">
                <button className="button-logo">
                    <img className="logo" src="/logo_ynov_campus_rvb_blanc.png" alt="Page de ticket Ynov"/>
                </button>
                <div>
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