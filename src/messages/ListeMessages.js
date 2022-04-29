import React, {Component} from "react";
import Message from './Message'
import NvMessage from './NvMessage'

class ListeMessages extends Component{
    constructor(props){
        super(props)
        this.ajoutMessage = this.ajoutMessage.bind(this)
        this.delMess = this.delMess.bind(this)
        this.state = {
            liste : [   
                {changePage:this.props.changePage, isUtilisateur:false, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:4, pseudo:"elMachoProtector", date:"27/02/2022", message: "Update de la dernière fois : on m'a parlé de Encanto: la fantastique famille Madrigal. Je déconseille !! Le film est pas mal mais les chansons sont encore plus entétantes que celle de la Reine des Neiges, dont je voulais me débarasser :'("},
                {changePage:this.props.changePage, isUtilisateur:false, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:3, pseudo:"elMachoProtector", date:"17/02/2022", message: "Quelqu'un aurait des films pour enfants à conseiller ?? J'en peux plus de revisionner la reine des neiges avec mes gosses !! Aidez-moi XDDD"},
                {changePage:this.props.changePage, isUtilisateur:false, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:2, pseudo:"darkSasukeVegeta", date:"07/02/2022", message: "NAN MAI WSSSHHH, ON SE RAIVOOOOOLTE ISSIIIIIII !!!! JPP LES GENS QUI RESPECTENT PAS LES PIGEONS VOUS ETES DES GROS MECHANT, WSH ILS ON UN COEUR AUSSI VOUS RESPECTER R"},
                {changePage:this.props.changePage, isUtilisateur:true, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:1, pseudo:"filanteetoile", date:"01/01/2022", message: "Bonne annee !!!! Pleins de bonnes choses à tous, des bisous et plein de bonne humeur !!!"},
                {changePage:this.props.changePage, isUtilisateur:true, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:0, pseudo:"filanteetoile", date:"01/01/2022", message: "Bonne annee !!!! Pleins de bonnes choses à tous, des bisous et plein de bonne humeur !!!"}
            ]
        }
    }

    ajoutMessage(msg) {
        console.log("coucou d'ajoutMessage(msg)")
        this.state.liste.unshift({ 
            changePage:this.props.changePage, isUtilisateur:true, delMess:this.delMess, isNuit:this.props.isNuit, idMessage:0, pseudo:"filanteetoile",
            date:"17/02/2022",
            message:msg
        });
        this.setState({
            liste: this.state.liste
        })
    }

    delMess(indexMess) {
        for (var i=0; i<this.state.liste.length; i++) {
            if (this.state.liste[i].idMessage == indexMess) {
                this.state.liste.splice(i,1);
            }
        }
        this.setState({
            liste: this.state.liste
        })
    }

    render() {
        return(
            <div className="messages">
                <NvMessage ajoutMessage={this.ajoutMessage} isNuit={this.props.isNuit}/>
                <h3>Liste de Messages</h3>
                <ul className="liste_messages">
                    {this.state.liste.map((mess, index) => (
                        <div key={index}>
                            <li>
                                {console.log("index : " + index)}
                                <Message 
                                    changePage={mess.changePage} 
                                    isUtilisateur={mess.isUtilisateur} 
                                    delMess={mess.delMess}
                                    isNuit={mess.isNuit}
                                    idMessage={mess.idMessage}
                                    pseudo={mess.pseudo}
                                    date={mess.date}
                                    message={mess.message}
                                />
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ListeMessages