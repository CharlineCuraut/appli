import React, { Component } from 'react'

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

    textAreaChange() {
        console.log("coucou de textAreaChange()")
        var c = document.getElementById('txt_nv_comm').value;
        this.setState({
            comm: c
        })
    }

    render() {
        var n = this.props.isNuit() ? "V2" : ""
        return (
            <div className={"nv_comm"+n}>
                <textarea id="txt_nv_comm" name="txt_nv_comm" onChange={this.textAreaChange}></textarea>
                <i className="fa-solid fa-paper-plane" onClick={this.ajoutCommentaire}></i>
            </div>
        )
    }
}

export default NvCommentaire;