import React, { Component } from 'react'
import {ThemeContext} from "../context/theme_context"


class NvMessage extends Component {
    constructor(props) {
        super(props)
        this.ajoutMessage = this.ajoutMessage.bind(this)
        this.textAreaChange = this.textAreaChange.bind(this)
        this.state = {
            msg:""
        }
    }

    async ajoutMessage() {
        if (this.state.msg !== '') {
            this.props.ajoutMessage(this.state.msg);
            // this.props.recupereMessages(10);
            document.getElementById('txt_nv_msg').value = '';
            this.setState({
                msg: ''
            })
        }
    }

    textAreaChange() {
        var m = document.getElementById('txt_nv_msg').value;
        this.setState({
            msg: m
        })
    }

    render() { 
        let t = this.context;
        var n = (t.theme === 'light') ? "" : "V2"

        return (
            <div className={"nv_msg"+n}>
                <h3>Nouveau Message</h3>
                <textarea id="txt_nv_msg" name="txt_nv_msg" onChange={this.textAreaChange}></textarea>
                <br />
                <button type="submit" name="bouton_ajout" id="bouton_ajout" onClick={this.ajoutMessage}>Ajout</button>
            </div>
        )
    }
}
NvMessage.contextType = ThemeContext;

export default NvMessage;