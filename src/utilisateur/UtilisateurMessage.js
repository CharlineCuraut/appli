import React, { Component } from 'react'
import Message from '../messages/Message'

class UtilisateurMessage extends Component {
    constructor(props) {
        super(props);
        this.delMess = this.delMess.bind(this)
        this.state = {
            liste : [
                {isUtilisateur:true, 
                delMess:this.delMess,
                idMessage:5,
                isNuit:this.props.isNuit,
                pseudo:"filanteetoile", 
                date:"12/04/2021", 
                message:"On ne voit pas le bout du confinement mais j'ai decouvert une nouvelle recette de cookie ! Je l'ai mise en ligne sur Marmiton, meme pseudo. Enjoy les cookies dans le canap', enrouler dans un plaid devant netflix avec un bon chocolat chaud. Bonne serie a tous !" },

                {isUtilisateur:true,
                delMess:this.delMess,
                isNuit:this.props.isNuit,
                idMessage:6,
                pseudo:"filanteetoile", 
                date:"23/10/2020",
                message:"Aller les amis, on se reconfine encore une fois, c'est pour le bien des familles. Pensez à ceux qui souffrent et surtout respectez bien les gestes barrières !" },

                {isUtilisateur:true, 
                delMess:this.delMess,
                isNuit:this.props.isNuit,
                idMessage:7,
                pseudo:"filanteetoile", 
                date:"09/07/2020",
                message:"Ce sont les vacances !!! Le confinement est finiiii, bravo a tous ! On va pouvoir profiter du beau temps et voyager !! Trop hate de partir aux Caraibes ;P" },
                
                {isUtilisateur:true,
                delMess:this.delMess,
                isNuit:this.props.isNuit,
                idMessage:8,
                pseudo:"filanteetoile", 
                date:"17/03/2020",
                message:"Omg ! Il parait qu'on va subir un confinement pour quelques semaines. Faites bien attention a vous tous et a vos proches ! Courage ! ce n'est que l'histoire d'un mois ou deux ^^" }
            ]
        }
    }

    delMess(indexMess) {
        console.log("coucou de delMess(param) utilisateur");
        console.log(indexMess);
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
        return (
            <div>
                <h3>Liste de Messages</h3>
                <ul className="liste_messages">
                    {this.state.liste.map((mess, index) => (
                        <li key={index}>
                            {console.log("index : " + index)}
                            <Message 
                                isUtilisateur={mess.isUtilisateur}
                                delMess={mess.delMess}
                                isNuit={mess.isNuit}
                                idMessage={mess.idMessage}
                                pseudo={mess.pseudo}
                                date={mess.date}
                                message={mess.message}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UtilisateurMessage;