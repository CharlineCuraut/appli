import React, { Component } from 'react'

class Ami extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var etat = this.props.isConnected ? "Connecte" : "Deconnecte"
        var e = this.props.isConnected ? "Connecté" : "Déconnecté"
        var n = this.props.isNuit() ? "V2" : ""

        return (
            <div>
                <div className={"ami"+n}>
                    <div className={"pdpAmi"+n}>
                        <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                    <div className="nomAmi">
                        <p>{this.props.login}</p>
                        <div className={"etat"+etat}>
                            <i className="fa-solid fa-circle"></i>
                            {" " + e}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
}

export default Ami;