import React, { Component } from 'react';
import NavigationPanel from './NavigationPanel'
import './messages/message.css'
import {IdContext} from "./context/id_context"

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.getConnected = (idU) => {
            console.log("getConnected de MainPage");
            this.setState(state => ({
                isConnected : true,
                profilVisited: "",
                page: 'pageAccueil', 
                idUser: idU
            }))
            console.log("id : " + this.state.idUser);
            console.log("isConnected : " + this.state.isConnected);
        }
        this.state = {
            page : 'connexion',
            profilVisited : "",
            isConnected : false,
            idUser : "",
            getConnected : this.getConnected
        }
        this.changePage = this.changePage.bind(this);
        this.changePage2 = this.changePage2.bind(this);
        this.setLogout = this.setLogout.bind(this);
    }

    setLogout() {
        this.setState({ isConnected: false, profilVisited:"", page: 'connexion', idUser:"" });
    }

    changePage2(etat) {
        this.setState({isConnected : this.state.isConnected, profilVisited:"", page : etat, idUser:this.state.idUser});
    }

    changePage(etat, pV) {
        console.log("appel de changePage depuis MainPage : pv=" + pV);
        this.setState({isConnected : this.state.isConnected, profilVisited:pV, page : etat, idUser:this.state.idUser});
    }

    render() {
        console.log("render de MainPage : pv=" + this.state.profilVisited);
        return (
            <IdContext.Provider value={{id : this.state.idUser, getConnected: this.state.getConnected}}>
                <NavigationPanel setLogout={this.setLogout} changePage={this.changePage} isConnected={this.state.isConnected} page={this.state.page} profilVisited={this.state.profilVisited}/>
            </IdContext.Provider>
        )
    }
}

export default MainPage;