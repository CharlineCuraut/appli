import React, { Component } from 'react'
import Ami from './Ami'
import axios from 'axios'

class ListeAmis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            liste: []
        }
        this.liste=this.liste.bind(this)
    }

    liste(){
        axios.get(`http://localhost:4000/apifriends/user/${this.props.id}/friends`)
            .then((res)=>{
                if (JSON.stringify(res.data) !== JSON.stringify(this.state.liste)){
                    this.setState({liste:res.data})
                }
            })
    }
    
    render() {
        this.liste()
        let o = this.state.liste.length===0? "Aucun contact encore :(":""
        return (
            <ul>
                {this.state.liste.map((ami, index) => (
                    <li key={index}>
                        <Ami 
                            login={ami}
                            isConnected={false}
                            changePage={this.props.changePage}
                        />
                    </li>
                ))}
                {o}
            </ul>
        )
    }
}

export default ListeAmis;