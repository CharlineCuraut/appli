import React, { Component } from 'react'
import Ami from './Ami'

class ListeAmis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liste: [
                {login:"billyBOB",
                isConnected:false,
                isNuit:this.props.isNuit},

                {login:"secretAgent007",
                isConnected:false,
                isNuit:this.props.isNuit},

                {login:"palmashowUltimate3000",
                isConnected:true,
                isNuit:this.props.isNuit},

                {login:"jackyJones123",
                isConnected:false,
                isNuit:this.props.isNuit},

                {login:"charlotteMaisPasAuxFraises",
                isConnected:true,
                isNuit:this.props.isNuit},

                {login:"floo",
                isConnected:false,
                isNuit:this.props.isNuit},

                {login:"stephii",
                isConnected:false,
                isNuit:this.props.isNuit}
            ]
        }
    }

    render() {
        return (
            <ul>
                {this.state.liste.map((ami, index) => (
                    <li key={index}>
                        <Ami 
                            login={ami.login}
                            isConnected={ami.isConnected} 
                            isNuit={this.props.isNuit}
                        />
                    </li>
                ))}
            </ul>
        )
    }
}

export default ListeAmis;