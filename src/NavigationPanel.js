import React, { Component } from 'react'
import Login from './login/Login';
import MurDeTweets from './murDeTweets/MurDeTweets';
import SignIn from './signIn/SignIn'
import Utilisateur from './utilisateur/Utilisateur'

class NavigationPanel extends Component {
    constructor(props) {
        super(props)
        this.nuit = this.nuit.bind(this)
        this.isNuit = this.isNuit.bind(this)
        this.state = {
            nuit: false
        }
    }

    nuit() {
        this.setState({
            nuit: !this.state.nuit
        })
    }

    isNuit() {
        return (this.state.nuit)
    }

    render() {
        if (this.props.isConnected) {
            if (this.props.page === 'pageAccueil') {
                return <MurDeTweets changePage={this.props.changePage} setLogout={this.props.setLogout} nuit={this.nuit} isNuit={this.isNuit}/>
            }
            if (this.props.page === 'utilisateur') {
                return <Utilisateur changePage={this.props.changePage} setLogout={this.props.setLogout} nuit={this.nuit} isNuit={this.isNuit}/>
            }
        } else {
            if (this.props.page === 'connexion') {
                return <Login changePage={this.props.changePage} getConnected={this.props.getConnected} nuit={this.nuit} isNuit={this.isNuit} />
            }
            if (this.props.page === 'inscription') {
                return <SignIn changePage={this.props.changePage} getConnected={this.props.getConnected} nuit={this.nuit} isNuit={this.isNuit}/>
            }
        }
        
    }
}

export default NavigationPanel;