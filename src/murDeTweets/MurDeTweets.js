import React, {Component} from 'react'
import Header from '../header/Header'
import BodyMurDeTweets from './BodyMurDeTweets'
import './murDeTweets.css'

class MurDeTweets extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Header changePage={this.props.changePage} setLogout={this.props.setLogout} isUtilisateur = {false} nuit={this.props.nuit} isNuit={this.props.isNuit}/>
                <BodyMurDeTweets changePage = {this.props.changePage} isNuit={this.props.isNuit}/>
            </div>
        )
    }
}

export default MurDeTweets;