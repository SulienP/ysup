import './error.css';
import '../../styles/global.css';
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='error alignCenter columnContainer'>
            <div className="container_login_page_background"></div>
            <h1>Error 404:</h1>
            <Link to={'/'} className='button-error'>Redirection</Link>
        </div>
    )
};

export default ErrorPage;