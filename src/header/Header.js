import React, { Component } from "react";
import Logo from './Logo'
import Recherche from './Recherche'
import Logout from './Logout'
import './header.css'

class Header extends Component{
    constructor(props){
        super(props)
        this.utilisateur = this.utilisateur.bind(this)
    }

    utilisateur() {
        this.props.changePage('utilisateur')
    }

    render() {
        var p = this.props.isUtilisateur ? "" : <button type="submit" name="buttonMaPage" id="buttonMaPage" onClick={this.utilisateur}>Ma Page</button>
        var labelIco = this.props.isNuit() ? 
        "Mode Jour" : "Mode Nuit"
        var n = this.props.isNuit() ? "V2" : ""
        return(
            <header className={"header"+n}>
                <Logo changePage = {this.props.changePage} isNuit={this.props.isNuit}/>
                <Recherche/>
                <div className="boutonsHeader">
                    <button type="submit" name="buttonNuit" id="buttonNuit" onClick={this.props.nuit}>{labelIco}</button>
                    {p}
                    <Logout changePage={this.props.changePage} setLogout={this.props.setLogout}/>
                </div>
            </header>
        )
    }
}

export default Header;