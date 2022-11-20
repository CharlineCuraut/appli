import React, { Component } from 'react';
import logo from "../images/logo.png"
import logoV2 from "../images/logoV2.png"
import axios from 'axios'
import "./login.css"
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.inscription = this.inscription.bind(this);
        this.click = this.click.bind(this);
        this.state = {
            error : null
        }
    }

    inscription() {
        this.props.changePage('inscription', "");
    }

    async click(e) {
        e.preventDefault()
        await axios.post("http://localhost:4000/api/user/login", {
            login: document.getElementById("login").value,
            password: document.getElementById("mdp").value
        })
            .then((res) => {
                let t = this.context;
                t.contextId.getConnected(res.data['id']);
                // console.log("getConnected appelé : id=" + t.contextId.id);
            })
            .catch(err => {this.setState({error:err.response.data.message})}) 
    }

    render() {
        let t = this.context
        var ico = (t.contextTheme.theme === 'light') ? 
            <i className="fa-solid fa-sun fa-3x" onClick={t.contextTheme.modifTheme}></i> :
            <i className="fa-solid fa-moon fa-3x" onClick={t.contextTheme.modifTheme}></i>
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
        var l = (t.contextTheme.theme === 'light') ? logo : logoV2

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
Login.contextType = ContextCombinedThemeAndId;

const WrappedLogin = props => {
    return (
      <ProvideCombinedContext>
        <Login changePage={props.changePage} />
      </ProvideCombinedContext>
    );
};
export default WrappedLogin;