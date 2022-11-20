import React, { Component } from 'react'
import UtilisateurMessage from './UtilisateurMessage.js'
import Header from '../header/Header'
import ListeAmis from './ListeAmis'
import './utilisateur.css'
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';
import axios from 'axios'


class Utilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login : "",
            idUser : this.props.profilVisited
        }
        console.log("idUser init Utilisateur : " + this.state.idUser);
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/api/user/${this.state.idUser}`)
        .then((res) => {
                this.setState({
                    login : res.data.user.login,
                    idUser : this.state.idUser
                });
                console.log("login componentDidMount Utilisateur : "+ this.state.login)
            }
        )
        .catch(() => {console.log("erreur get Utilisateur")})
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.profilVisited!==this.props.profilVisited){
        axios.get(`http://localhost:4000/api/user/${this.props.profilVisited}`)
            .then((res) => {
                    this.setState({
                        login : res.data.user.login,
                        idUser : this.props.profilVisited
                    });
                }
            )
            .catch(() => {console.log("erreur get Utilisateur")})
            }
    }

    render() {
        let t = this.context;
        let n = (t.contextTheme.theme === 'light') ? "" : "V2"
        let id = t.contextId.id

        console.log("render de Utilisateur : pv=" + this.state.login);
        return (
            <div>
                <Header changePage={this.props.changePage} setLogout={this.props.setLogout} isUtilisateur = {this.state.idUser === id} />
                <div className={"corps"+n}>
                    <aside className="liste_contacts">
                        <h3> Liste des contacts </h3>
                         <ListeAmis changePage={this.props.changePage} id={this.state.idUser}/>
                    </aside>
                    <div className="messages">
                        <div className={"titre_page"+n}>
                            <i className="fa-solid fa-user fa-5x"></i>
                            <div>
                                <h1>{"Profil de " + this.state.login}</h1>
                                {(this.state.idUser !== id) && 
                                    <button id="ajout_contact">Ajouter en contact</button>
                                }
                            </div>
                        </div>
                        <UtilisateurMessage profil={this.state.login} isUtilisateur={this.state.idUser === id}/>
                    </div>
                </div>
            </div>
        );
    }
}
Utilisateur.contextType = ContextCombinedThemeAndId;

const WrappedUtilisateur = props => {
    return (
      <ProvideCombinedContext>
        <Utilisateur profilVisited={props.profilVisited} changePage={props.changePage} setLogout={props.setLogout} isUtilisateur={true}/>
      </ProvideCombinedContext>
    );
};
export default WrappedUtilisateur;