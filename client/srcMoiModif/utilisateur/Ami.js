import axios from 'axios'
import React, { Component } from 'react'
import {ThemeContext} from "../context/theme_context"


class Ami extends Component {
    constructor(props){
        super(props)
        this.utilisateur = this.utilisateur.bind(this)
    }

    utilisateur() {
        axios.get(`http://localhost:4000/api/user/getID/${this.props.login}`)
            .then(id=> this.props.changePage('utilisateur', id.data))
            .catch(()=>console.log("erreur ami"))
    }

    render() {
        let t = this.context;
        let n = (t.theme === 'light') ? "" : "V2"

        var etat = this.props.isConnected ? "Connecte" : "Deconnecte"
        var e = this.props.isConnected ? "Connecté" : "Déconnecté"

        return (
            <div onClick={this.utilisateur}>
                <div className={"ami"+n}>
                    <div className={"pdpAmi"+n}>
                        <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                    <div className="nomAmi">
                        <p>{this.props.login}</p>
                        <div className={"etat"+etat}>
                            <i className="fa-solid fa-circle"></i>
                            {" " + e}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}
Ami.contextType = ThemeContext;

export default Ami;