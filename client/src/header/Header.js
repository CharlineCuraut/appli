import React, { Component } from "react";
import Logo from './Logo'
import Recherche from './Recherche'
import Logout from './Logout'
import './header.css'
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';


class Header extends Component{
    constructor(props){
        super(props)
        this.utilisateur = this.utilisateur.bind(this)
    }

    utilisateur() {
        let id = this.context.contextId.id
        this.props.changePage('utilisateur', id)
    }

    render() {
        let t = this.context
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
        var b = (t.contextTheme.theme === 'light') ? "mode nuit" : "mode jour"
        var p = this.props.isUtilisateur ? "" : <button type="submit" name="buttonMaPage" id="buttonMaPage" onClick={this.utilisateur}>Ma Page</button>
        return(
            <header className={"header"+n}>
                <Logo changePage = {this.props.changePage}/>
                <Recherche/>
                <div className="boutonsHeader">
                    <button type="submit" name="buttonNuit" id="buttonNuit" onClick={t.contextTheme.modifTheme}>{b}</button>
                    {p}
                    <Logout changePage={this.props.changePage} setLogout={this.props.setLogout}/>
                </div>
            </header>
        )
    }
}
Header.contextType = ContextCombinedThemeAndId

const WrappedHeader = props =>{
    return (
        <ProvideCombinedContext>
            <Header changePage={props.changePage} setLogout={props.setLogout} isUtilisateur = {props.isUtilisateur} />
        </ProvideCombinedContext>
      );
}

export default WrappedHeader;