import React, {Component} from "react";
import Message from './Message'
import NvMessage from './NvMessage'
import { IdContext } from "../context/id_context";
import axios from "axios";

class ListeMessages extends Component{
    constructor(props){
        super(props)
        this.ajoutMessage = this.ajoutMessage.bind(this);
        this.recupereLogin = this.recupereLogin.bind(this); 
        this.recupereMessages = this.recupereMessages.bind(this);
        this.delMess = this.delMess.bind(this)
        this.moreMessages = this.moreMessages.bind(this)
        this.state = {
            profil : "",
            nbMessAffich: 10,
            listeMess : []
        }
    }

    async recupereLogin() {
        console.log("appel de recupereLogin()")
        let t = this.context;
        let id = t.id;
        await axios.get(`http://localhost:4000/api/user/${id}`)
        .then((res) => {
            this.setState({
                profil : res.data['user']['login'],
                nbMessAffich: this.state.nbMessAffich,
                listeMess : this.state.listeMess
            });
            console.log("recupereLogin() : profil=" + this.state.profil);
        })
        .catch(e => {console.log("erreur getLogin ListeMessages")})
    }

    async recupereMessages() {
        // console.log("nbAffichage = " + nbAffichage);
        console.log("appel recupereMessages");
        var nbAffichage = this.state.nbMessAffich;
        await axios.get(`http://localhost:4000/apimessages/messages/getNMessages/${nbAffichage}`)
            .then((res) => {
                this.setState({
                    profil : this.state.profil,
                    nbMessAffich: this.state.nbMessAffich,
                    listeMess : res.data
                })
                console.log("longueur liste de messages : " + this.state.listeMess.length);
            })
            .catch(e => {console.log({error:e.response.data.message})})
    }

    async ajoutMessage(msg) {
        let t = this.context;
        let idUser = t.id;
        await axios.post(`http://localhost:4000/apimessages/user/${idUser}/messages`, {message: msg})
        .then((res) => {
            console.log("j'ai rajouté le message dans le db !");
            this.props.recupereNbMess();
            this.setState({
                profil : "",
                nbMessAffich: this.state.nbMessAffich,
                listeMess : []
            })
        })
        .catch(e => {console.log({error:e.response.data.message})})
    }

    async delMess(idMess, msg) {
        let t = this.context;
        let idUser = t.id;
        console.log("idUser : " + idUser + " et idMess : " + idMess);
        await axios.delete(`http://localhost:4000/apimessages/user/${idUser}/messages/${idMess}`, {data: {message: msg}})
        .then((res) => {
            console.log(res.data['message']);
            this.props.recupereNbMess();
            this.setState({
                profil : "",
                nbMessAffich: this.state.nbMessAffich,
                listeMess : []
            })
        })
        .catch(e => {console.log({error:e.response.data.message})})
    }

    moreMessages() {
        this.setState({
            profil : "",
            nbMessAffich: this.state.nbMessAffich + 10,
            listeMess : []
        })
    }


    render() {
        if (this.state.profil === "") this.recupereLogin();
        if (this.state.listeMess.length === 0) this.recupereMessages();
        console.log("longueur liste de messages : " + this.state.listeMess.length);
        var diff = this.props.nbMessTotal - this.state.nbMessAffich
        // console.log("diff = " + diff)
        var more = (diff > 0) ? <i onClick={this.moreMessages} className="fa-solid fa-angle-down"></i> : <p>sorry, no more messages ! You can write one on your own too complete the list ;)</p>

        return(
            <div className="messages">
                <NvMessage ajoutMessage={this.ajoutMessage} />
                <div className="titreAndRefresh">
                    <h3>Liste de Messages</h3>
                </div>
                <ul className="liste_messages">
                    {this.state.listeMess.map((mess, index) => (
                        <div key={index}>
                            <li>
                                <Message 
                                    changePage={this.props.changePage} 
                                    isUtilisateur={mess.loginUser===this.state.profil} 
                                    delMess={this.delMess}
                                    idUser={mess.idUser}
                                    idMessage={mess._id}
                                    pseudo={mess.loginUser}
                                    date={mess.date}
                                    message={mess.message}  
                                />
                            </li>
                        </div>
                    ))}
                </ul>
                {more}
                <p>  </p>
            </div>
        )
    }
}
ListeMessages.contextType = IdContext;

export default ListeMessages