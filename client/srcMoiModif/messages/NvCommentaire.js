import React, { Component } from 'react'
import {ThemeContext} from "../theme_context"


class NvCommentaire extends Component {
    constructor(props) {
        super(props)
        this.ajoutCommentaire = this.ajoutCommentaire.bind(this)
        this.textAreaChange = this.textAreaChange.bind(this)
        this.state = {
            comm :''
        }
    }

    ajoutCommentaire() {
        if (this.state.comm !== '') {
            this.props.ajoutCommentaire(this.state.comm);
            document.getElementById('txt_nv_comm').value = '';
            this.setState({
                comm: ''
            })
        }
    }

    // async click(e) {
    //     e.preventDefault()
    //     await axios.post("http://localhost:4000/apimessages/user/:user_id(\\d+)/message", {
    //         idMessages: document.getElementById("login").value,
    //         message: document.getElementById("txt_nv_comm").value,
    //         date : cbiyso,
    //         idUser : dnuopq
    //     })
    //         .then(() => {this.props.getConnected()})
    //         .catch(e => {this.setState({error:e.response.data.message})}) 
    // }

    textAreaChange() {
        console.log("coucou de textAreaChange()")
        var c = document.getElementById('txt_nv_comm').value;
        this.setState({
            comm: c
        })
    }

    render() {
        let t = this.context;
        var n = (t.theme === 'light') ? "" : "V2"

        return (
            <div className={"nv_comm"+n}>
                <textarea id="txt_nv_comm" name="txt_nv_comm" onChange={this.textAreaChange}></textarea>
                <i className="fa-solid fa-paper-plane" onClick={this.ajoutCommentaire}></i>
            </div>
        )
    }
}
NvCommentaire.contextType = ThemeContext;

export default NvCommentaire;