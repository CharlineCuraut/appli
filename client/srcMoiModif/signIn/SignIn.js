import React, { Component } from "react";
import logo from "../images/logo.png"
import logoV2 from "../images/logoV2.png"
import axios from 'axios'
import "./signIn.css"
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';


class SignIn extends Component{
    constructor(props){
        super(props);
        this.connexion = this.connexion.bind(this);
        this.click = this.click.bind(this)
        this.state = {
            error : null
        }
    }

    connexion() {
        this.props.changePage('connexion', "");
    }

    async click(e) {
        e.preventDefault()
        await axios.put("http://localhost:4000/api/user", {
                login: document.getElementById("login").value,
                password: document.getElementById("mdp").value,
                confirmpassword: document.getElementById("mdp2").value,
                lastname: document.getElementById("lastname").value,
                firstname: document.getElementById("firstname").value
            }
        )
        .then((res) => {
            let t = this.context;
            t.contextId.getConnected(res.data['id']);
        })
        .catch(e => {this.setState({error:e.response.data.message})})
    }

    render() {
        let t = this.context
        var ico = (t.contextTheme.theme === 'light') ? 
            <i className="fa-solid fa-sun fa-3x" onClick={t.contextTheme.modifTheme}></i> :
            <i className="fa-solid fa-moon fa-3x" onClick={t.contextTheme.modifTheme}></i>
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
        var l = (t.contextTheme.theme === 'light') ? logo : logoV2

        return (
            <div className={"divEnregistrement"+n}>
                <header className="headerEnregistrement">
                    <img className="logo" src={l} alt="logo"/>
                    <div className="enregistrementEcriture">
                        <h1>Enregistrement </h1>
                        {ico}
                        <p><i>Veuillez remplir le formulaire ci-dessous pour vous inscrire :</i></p>
                    </div>
                </header>
                <form className="enregistrementForm">
                    <div className="enregistrementNoms">
                        <span>
                            <p>Prenom</p>
                            <input type="text" id="firstname"/>
                        </span>
                        <span>
                            <p>Nom</p>
                            <input type="text" id="lastname"/>
                        </span>
                    </div>
                    <div className="enregistrementPartie2">
                        <label htmlFor="login" >Login</label>
                        <input type="text" id="login" name="login"/>
                    </div>
                    <div className="enregistrementPartie2">
                        <label htmlFor="mdp" >Mot de Passe</label>
                        <input type="password" id="mdp" name="mdp"/>
                    </div>
                    <div className="enregistrementPartie2">
                        <label htmlFor="mdp2" >Retapez</label>
                        <input type="password" id="mdp2" name="mdp2"/>
                    </div>
                    {this.state.error}
                    <div className={"enregistrementBoutons"+n}>
                        <button type="submit" onClick={this.click}>Enregistrer</button>
                        <button type="submit" onClick={this.getter}>Connexion</button>
                    </div>
                    <br />
                </form>
            </div>
        );
    }
}
SignIn.contextType = ContextCombinedThemeAndId;

const WrappedSignIn = props => {
    return (
      <ProvideCombinedContext>
        <SignIn changePage={props.changePage} />
      </ProvideCombinedContext>
    );
};
export default WrappedSignIn;