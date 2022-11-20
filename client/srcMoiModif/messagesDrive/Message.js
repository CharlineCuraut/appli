import React, { Component } from "react";
import BoutonsMsg from "./BoutonsMsg"
import axios from 'axios'
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';

class Message extends Component{
    constructor(props){
        super(props)
        this.delMess = this.delMess.bind(this)
        this.utilisateur = this.utilisateur.bind(this)
        this.isModifMess = this.isModifMess.bind(this)
        this.modifMess1 = this.modifMess1.bind(this)
        this.modifMess2 = this.modifMess2.bind(this)
        this.textAreaChange = this.textAreaChange.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.suppFriend = this.suppFriend.bind(this)
        this.state = {
            modifMsg:false,
            old_message:this.props.message,
            new_message: "",
            isF:null
        }
    }

    utilisateur() {
        this.props.changePage('utilisateur', this.props.idUser)
    }

    delMess() {
        this.props.delMess(this.props.idMessage, this.props.message);
    }

    modifMess1() {
        console.log("appel modifMess1()");
        this.setState({
            modifMsg: !this.state.modifMsg,
            old_message: this.state.old_message,
            new_message : this.state.old_message
        })
    }

    async modifMess2() {
        let t = this.context;
        const idUser = t.contextId.id;
        await axios.put(`http://localhost:4000/apimessages/user/${idUser}/messages`, {new_message: this.state.new_message, old_message: this.state.old_message})
            .then((res) => {
                console.log(res.data['message']);
                this.setState({
                    modifMsg: !this.state.modifMsg,
                    old_message: this.state.new_message,
                    new_message: "",
                    isF:this.state.isF
                })
            })
    }

    isModifMess() {
        return (this.state.modifMsg)
    }

    textAreaChange() {
        let t = this.context;
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
        var contenu = document.getElementById("messagetxtarea"+n).value;
        this.setState({
            modifMsg: this.state.modifMsg,
            old_message: this.state.old_message,
            new_message : contenu,
            isF:this.state.isF
        })
    }

    addFriend(){
        axios.post(`http://localhost:4000/apifriends/user/${this.context.contextId.id}/friend/${this.props.idUser}`)
            .then(res=>{
                this.setState({
                    modifMsg: this.state.modifMsg,
                    old_message: this.state.old_message,
                    new_message : this.state.new_message,
                    isF: !this.state.isF
                })
            })
    }

    suppFriend(){
        axios.delete(`http://localhost:4000/apifriends/user/${this.context.contextId.id}/friend/${this.props.idUser}`)
        .then(res=>{
            this.setState({
                modifMsg: this.state.modifMsg,
                old_message: this.state.old_message,
                new_message : this.state.new_message,
                isF: !this.state.isF
            })
        })
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/apifriends/user/${this.context.contextId.id}/friend/${this.props.idUser}`)
            .then(res=>{
                this.setState({
                    modifMsg: this.state.modifMsg,
                    old_message: this.state.old_message,
                    new_message : this.state.new_message,
                    isF: res.data.message
                })
            })
    }


    render(){
        let t = this.context;
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
        var pMessage = <p id={"message"+n}>{this.state.old_message}</p>
        var txtAreaMessage = <textarea id={"messagetxtarea"+n} name="messagetxtarea" onChange={this.textAreaChange} defaultValue={this.state.old_message}></textarea>
        var m = this.isModifMess() ? txtAreaMessage : pMessage
        var addF = this.props.isUtilisateur ? null:
            (this.state.isF ? <button onClick={this.suppFriend}><i className="fa-solid fa-user-slash"></i></button> : 
                        <button onClick={this.addFriend}><i className="fa-solid fa-user-plus"></i></button>)

        return(
            <div className="msg">
                <div className={"box_msg"+n}>
                    <div id="dessusMsg">
                        <div>
                            <em id="" onClick={this.utilisateur}>{this.props.pseudo} </em>
                            {addF}
                        </div>  
                        <p><i>{this.props.date}</i></p>
                    </div>
                    {m}
                    <BoutonsMsg isUtilisateur = {this.props.isUtilisateur} delMess={this.delMess} modifMess1={this.modifMess1} modifMess2={this.modifMess2} isModifMess={this.isModifMess} />
                </div>
                <br/>
            </div>
        )
    }
}
Message.contextType = ContextCombinedThemeAndId;

const WrappedMessage = props => {
    return (
      <ProvideCombinedContext>
        <Message 
            changePage={props.changePage} 
            isUtilisateur={props.isUtilisateur} 
            delMess={props.delMess}
            idMessage={props.idMessage}
            idUser={props.idUser}
            pseudo={props.pseudo}
            date={props.date}
            message={props.message}/>
      </ProvideCombinedContext>
    );
};
export default WrappedMessage;