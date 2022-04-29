import React, { Component } from "react";
import BoutonsMsg from "./BoutonsMsg"

class Message extends Component{
    constructor(props){
        super(props)
        this.delMess = this.delMess.bind(this)
        this.utilisateur = this.utilisateur.bind(this)
        this.isModifMess = this.isModifMess.bind(this)
        this.modifMess = this.modifMess.bind(this)
        this.textAreaChange = this.textAreaChange.bind(this)
        this.state = {
            modifMsg:false,
            message:this.props.message
        }
    }

    utilisateur() {
        this.props.changePage('utilisateur')
    }

    delMess() {
        this.props.delMess(this.props.idMessage);
    }

    modifMess() {
        this.setState({
            modifMsg: !this.state.modifMsg,
            message: this.state.message
        })
        
    }

    isModifMess() {
        return (this.state.modifMsg)
    }

    textAreaChange() {
        var n = this.props.isNuit() ? "V2" : ""
        var contenu = document.getElementById("messagetxtarea"+n).value;
        this.setState({
            modifMsg: this.state.modifMsg,
            message: contenu
        })
    }


    render(){
        var n = this.props.isNuit() ? "V2" : ""
        var pMessage = <p id={"message"+n}>{this.state.message}</p>
        var txtAreaMessage = <textarea id={"messagetxtarea"+n} name={"messagetxtarea"+n} onChange={this.textAreaChange} defaultValue={this.state.message}></textarea>
        var m = this.isModifMess() ? txtAreaMessage : pMessage

        return(
            <div className="msg">
                <div className={"box_msg"+n}>
                    <div id="dessusMsg">
                        <div>
                            <em onClick={this.utilisateur}>{this.props.pseudo} </em>
                            <button>+</button>
                        </div>  
                        <p><i>{this.props.date}</i></p>
                    </div>
                    {m}
                    <BoutonsMsg isUtilisateur = {this.props.isUtilisateur} delMess={this.delMess} isNuit={this.props.isNuit} modifMess={this.modifMess} isModifMess={this.isModifMess} />
                </div>
                <br/>
            </div>
        )
    }
}

export default Message