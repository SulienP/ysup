import "./recherche_comp.css";
import searcheLogo from "../../assets/Images/search_logo.svg";

const RechercheComp = () => {
    return (
        <div className="recherche-comp">
            <img src={searcheLogo}/>
            <input type="text" placeholder="Recherche ..."/>
        </div>
    )
};

export default RechercheComp;