import React, { Component } from 'react'
import Commentaire from './Commentaire'
import NvCommentaire from './NvCommentaire'


class ListeCommentaire extends Component {
    constructor(props) {
        super(props)
        this.ajoutCommentaire = this.ajoutCommentaire.bind(this)
        this.state = {
            liste: [
                {login:"filanteetoile",
                id_comm:20,
                msg_comm:"lol"},

                {login:"stephii",
                id_comm:21,
                msg_comm:"courage ma puce !"},

                {login:"floo",
                id_comm:22,
                msg_comm:"too bad XD"}
            ]
        }
    }
    

    ajoutCommentaire(com) {
        this.state.liste.unshift({
            login:"filanteetoile",
            msg_comm:com,
            id_comm:1000
        });
        this.setState({
            liste: this.state.liste
        })
    }

    delComm(indexComm) {
        for (var i=0; i<this.state.liste.length; i++) {
            if (this.state.liste[i].id_comm === indexComm) {
                this.state.liste.splice(i,1)
            }
        }
        this.setState({
            liste : this.state.liste
        })
    }


    render() {
        return (
            <div>
                <br/>
                <NvCommentaire ajoutCommentaire={this.ajoutCommentaire} />
                <ul className="liste_commentaires">
                    {this.state.liste.map((comm, index) => (
                        <div key={index}>
                            <li>
                                <Commentaire 
                                    login={comm.login}
                                    id_comm={comm.id_comm}
                                    msg_comm={comm.msg_comm}
                                />
                            </li>
                        </div> 
                    ))}
                </ul>
            </div>
        )
    }
}

export default ListeCommentaire;