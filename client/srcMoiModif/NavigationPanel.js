import React, { Component } from 'react'
import Login from './login/Login';
import MurDeTweets from './murDeTweets/MurDeTweets';
import SignIn from './signIn/SignIn'
import Utilisateur from './utilisateur/Utilisateur'
import {ThemeContext} from './context/theme_context'


class NavigationPanel extends Component {
    constructor(props) {
        super(props);
        this.modifTheme = () => {
            this.setState(state => ({
                theme : 
                    state.theme === 'light' ? 'dark' : 'light'
            }))
        };
        this.state = {
            theme: 'light',
            modifTheme: this.modifTheme
        };
    }


    render() {
        if (this.props.isConnected) {
            if (this.props.page === 'pageAccueil') {
                return (
                    <ThemeContext.Provider value={this.state}>
                        <MurDeTweets  changePage={this.props.changePage} setLogout={this.props.setLogout} />
                    </ThemeContext.Provider>
                )
            }
            if (this.props.page === 'utilisateur') {
                console.log("render de NavigationPanel : pv=" + this.props.profilVisited);
                return (
                    <ThemeContext.Provider value={this.state}> 
                        <Utilisateur profilVisited={this.props.profilVisited} changePage={this.props.changePage} setLogout={this.props.setLogout} isUtilisateur={true} />
                    </ThemeContext.Provider>
                )
            }
        } else {
            if (this.props.page === 'connexion') {
                return (
                    <ThemeContext.Provider value={this.state}> 
                        <Login changePage={this.props.changePage} />
                    </ThemeContext.Provider>
                )
            }
            if (this.props.page === 'inscription') {
                return (
                    <ThemeContext.Provider value={this.state}> 
                        <SignIn changePage={this.props.changePage} />
                    </ThemeContext.Provider>
                )
            }
        }
        
    }
}

export default NavigationPanel;