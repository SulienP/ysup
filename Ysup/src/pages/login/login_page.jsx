import { LoginComp } from "../../components/login/login_comp"
import './login_page.css';
import '../../styles/global.css';

const LoginPage = () => {
    return <>
        <LoginComp />
        <div className="container_login_page_background"></div>
    </>
}

export default LoginPage;