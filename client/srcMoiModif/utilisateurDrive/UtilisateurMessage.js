import React, { Component } from 'react'
import Message from '../messages/Message'
import axios from 'axios'
import {IdContext} from '../context/id_context'

class UtilisateurMessage extends Component {
    constructor(props) {
        super(props);
        this.delMess = this.delMess.bind(this)
        this.state = {
            listeMess : []
        }
    }

    async delMess(idMess, msg) {
        let t = this.context;
        let idUser = t.id;
        await axios.delete(`http://localhost:4000/apimessages/user/${idUser}/messages/${idMess}`, {data: {message: msg}})
        .then((res) => {
            console.log(res.data['message']);
            this.setState({
                listeMess : []
            })
        })
        .catch(e => {console.log({error:e.response.data.message})})
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/apimessages/messages/getNmessages/10/fromUser/${this.props.profil}`)
            .then(res => {
                this.setState({
                    listeMess : res.data
                })
            })
            .catch(e => {console.log({error:e.response.data.message})})
    }
    

    componentDidUpdate(prevProps, prevState){
        if (prevProps.profil !== this.props.profil){
            axios.get(`http://localhost:4000/apimessages/messages/getNmessages/10/fromUser/${this.props.profil}`)
            .then(res => {
                this.setState({
                    listeMess : res.data
                })
            })
            .catch(e => {console.log({error:e.response.data.message})})
        }
    }

    render() {
        let o = this.state.listeMess.length===0? "Aucun message encore publié :(":""
        console.log(this.state.listeMess)
        return (
            <div>
                <h3>Liste de Messages</h3>
                <ul className="liste_messages">
                    {this.state.listeMess.map((mess, index) => (
                        <li key={index}>
                            <Message 
                                isUtilisateur={this.props.isUtilisateur} 
                                delMess={this.delMess}
                                idUser={mess.idUser}
                                idMessage={mess._id}
                                pseudo={mess.loginUser}
                                date={mess.date}
                                message={mess.message}
                            />
                        </li>
                    ))}
                    {o}
                </ul>
            </div>
        );
    }
}
UtilisateurMessage.contextType = IdContext;

export default UtilisateurMessage;