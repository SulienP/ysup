import './create_ticket.css';
import '../../styles/global.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/constants';
import { getCookie } from '../../services/jwt_services';

export const CreateTicketComp = () => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState();
    const [title, setTitle] = useState("");
    const [cookieJwt, setCookieJwt] = useState("");
    const [contentTicket, setContentTicket] = useState("");
    const [file, setFile] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const maxLengthTitle = 50;

    const handleTitle = (txt) => {
        if (title.length < maxLengthTitle) {
            setTitle(txt);
        };
    }

    useEffect(() => {
        setCookieJwt(getCookie());
        axios.get(apiUrl + 'getalltags').then((response) => {
            setTags(response.data)
        })
    }, [cookieJwt]);

    const handleSubmit = () => {
        if (cookieJwt) {
            axios.post(apiUrl + 'createticket',
                { jwt: cookieJwt, tag: selectedTag, title: title, content: contentTicket, file: file, date: new Date() }
            ).catch((err) => setErrorMsg(err))
        } else {
            setErrorMsg("Utilisateur non connecté")
        }
    }
    return (
        <main className='container_add_ticket columnContainer'>
            <h1>Créer un ticket</h1>
            <section className='rowContainer container_tag_file'>
                <article className='columnContainer'>
                    <h3>Catégorie</h3>
                    <select className='select_tag' name="tags" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                        <option disabled>selectionner</option>
                        {tags.map((tag , index) => (
                            <option key={index}value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </article>
                <article className='columnContainer'>
                    <h3>Ajouter une pièce jointe</h3>
                    <input className='input_content' type="text" name="titleTicket" placeholder='Lien image' onChange={(e) => { setFile(e.target.value) }} />
                </article>
            </section>
            <section className='columnContainer'>
                <h3>Motif :</h3>
                <input className='input_content' type="text" name="titleTicket" placeholder='Motif du ticket' onChange={(e) => { handleTitle(e.target.value) }} />
            </section>
            <section className='columnContainer'>
                <h3>Description</h3>
                <textarea className='input_content' name="content" cols="30" rows="8" placeholder='Entrez contenu ticket' onChange={(e) => setContentTicket(e.target.value)} />
            </section>
            <p className='errorMsg'>{errorMsg}</p>
            <button className='submit_btn' onClick={handleSubmit}>Envoyer</button>
        </main>
    )
}