import React, { Component } from 'react';
import NavigationPanel from './NavigationPanel'
import './messages/message.css'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 'connexion',
            isConnected : false
        }
        this.changePage = this.changePage.bind(this);
        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
    }

    getConnected(){
        this.setState({isConnected : true, page : 'pageAccueil'});
    }

    setLogout() {
        this.setState({ isConnected: false, page: 'connexion' });
    }

    changePage(etat) {
        this.setState({isConnected : this.state.isConnected, page : etat});
    }

    render() {
        return (
            <NavigationPanel getConnected={this.getConnected} setLogout={this.setLogout} changePage={this.changePage} isConnected={this.state.isConnected} page={this.state.page} />
        )
    }
}

export default MainPage;