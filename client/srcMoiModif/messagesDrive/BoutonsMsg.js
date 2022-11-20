import React, { Component } from 'react'
import ListeCommentaire from './ListeCommentaire'

class BoutonsMsg extends Component {
    constructor(props) {
        super(props)
        this.liker = this.liker.bind(this)
        this.voirCom = this.voirCom.bind(this)
        this.state = {
            like: false,
            com: false
        }
    }

    liker() {
        this.setState({
            like: !this.state.like,
            com: this.state.com
        })
    }

    voirCom() {
        this.setState({
            like: this.state.like,
            com: !this.state.com
        })
    }


    render() {
        var coeur = this.state.like ?
            <i className="fa-solid fa-heart" id="coeur1" onClick={this.liker}></i>:
            <i className="fa-regular fa-heart" id="coeur2" onClick={this.liker}></i>
        var com = this.state.com ?
            <i className="fa-solid fa-comment" id="com1" onClick={this.voirCom}></i>:
            <i className="fa-regular fa-comment" id="com2" onClick={this.voirCom}></i>
        var trash = this.props.isUtilisateur ?
            <i onClick={this.props.delMess} className="fa-solid fa-trash-can"></i> : <i></i>
        var pencil = this.props.isUtilisateur ? 
            <i onClick={this.props.modifMess1} className="fa-solid fa-pencil"></i> : <i></i>
        var modification = this.props.isModifMess() ?
            <i onClick={this.props.modifMess2} className="fa-solid fa-check"></i> : pencil
        var liste = this.state.com ?
        <ListeCommentaire /> : ""

        return (
            <div>
                <div className="dessousMsg">
                    <div className="boutonsGauche">
                        {coeur}
                        {com}
                        <i className="fa-solid fa-share-nodes"></i>
                    </div>
                    <div className="boutonsDroite">
                        {modification}
                        {trash}
                    </div>
                </div>
                {liste}
            </div>
        )
    }
}

export default BoutonsMsg