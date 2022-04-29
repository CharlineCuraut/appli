import React, { Component } from 'react'
import UtilisateurMessage from './UtilisateurMessage.js'
import Header from '../header/Header'
import ListeAmis from './ListeAmis'
import './utilisateur.css'

class Utilisateur extends Component {

    render() {
        var n = this.props.isNuit() ? "V2" : ""
        return (
            <div>
                <Header changePage={this.props.changePage} setLogout={this.props.setLogout} isUtilisateur = {true} nuit={this.props.nuit} isNuit={this.props.isNuit}/>
                <div className={"corps"+n}>
                    <aside className="liste_contacts">
                        <h3> Liste des contacts </h3>
                        <ListeAmis isNuit={this.props.isNuit}/>
                    </aside>
                    <div className="messages">
                        <div className={"titre_page"+n}>
                            <i className="fa-solid fa-user fa-5x"></i>
                            <div>
                                <h1>Profil de filanteetoile</h1>
                                <button id="ajout_contact">Ajouter en contact</button>
                            </div>
                         </div>
                        <UtilisateurMessage isNuit={this.props.isNuit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Utilisateur;