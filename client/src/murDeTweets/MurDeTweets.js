import React, {Component} from 'react'
import Header from '../header/Header'
import BodyMurDeTweets from './BodyMurDeTweets'
import './murDeTweets.css'

class MurDeTweets extends Component{
    render(){
        return(
            <div>
                <Header changePage={this.props.changePage} setLogout={this.props.setLogout} isUtilisateur = {false} />
                <BodyMurDeTweets changePage = {this.props.changePage} />
            </div>
        )
    }
}

export default MurDeTweets;