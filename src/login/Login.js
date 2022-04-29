import React, { Component } from 'react';
import logo from "../images/logo.png"
import logoV2 from "../images/logoV2.png"
import axios from 'axios'
import "./login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.inscription = this.inscription.bind(this)
        this.click = this.click.bind(this)
        this.state = {
            error : null
        }
    }

    inscription() {
        this.props.changePage('inscription');
    }

    async click(e) {
        e.preventDefault()
        await axios.post("http://localhost:4000/api/user/login", {
            login: document.getElementById("login").value,
            password: document.getElementById("mdp").value
        })
            .then(() => {this.props.getConnected()})
            .catch(e => {this.setState({error:e.response.data.message})}) 
    }

    render() {
        var n = this.props.isNuit() ? "V2" : ""
        var l = this.props.isNuit() ? logoV2 : logo
        var ico = this.props.isNuit() ?
            <i className="fa-solid fa-moon fa-3x" onClick={this.props.nuit}></i> :
            <i className="fa-solid fa-sun fa-3x" onClick={this.props.nuit}></i>

        return (
            <div className={"divConnexion"+n}>
                <header className="headerConnexion">
                    <img className="logo" src={l} alt="logo"/>
                    <div className="connexionEcriture">
                        <h1>Bienvenue ! </h1>
                        {ico}
                        <p><i>Remplissez-le formulaire ci-dessous pour vous connecter :</i></p>
                    </div>
                </header>
                <form className="connexionForm">
                    <div className="connexionPartieUn">
                        <div className="co">
                            <label htmlFor="login">Login</label>
                            <input type="email" id="login" name="login"/>
                        </div>
                        <div className="co">
                            <label htmlFor="mdp">Mot de Passe</label>
                            <input type="password" id="mdp" name="mdp"/>
                        </div>
                    </div>
                    {this.state.error}
                    <div className={"connexionBoutons"+n}>
                        <button type="submit" onClick={this.click}>Connexion</button>
                        <button type="submit" onClick={this.inscription}>S'inscrire</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;