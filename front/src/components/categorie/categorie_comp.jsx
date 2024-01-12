import "./categorie_comp.css";

const CategorieComp = ({onclick , idTag , name}) => {

    const sendDataToParent = () => {
        onclick(idTag);
    };
    return (
        <div  onClick={sendDataToParent} className={`categorieComp`}>
            <p>{name}</p>
        </div>
    )
};

export default CategorieComp;