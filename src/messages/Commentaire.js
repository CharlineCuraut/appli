import React, { Component } from 'react'

class Commentaire extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var n = this.props.isNuit() ? "V2" : ""
        return (
            <div>
                <br/>
                <div className={"commentaire"+n}>
                    <div className={"pdpComm"+n}>
                        <i className="fa-solid fa-user fa-2x"></i>
                    </div>
                    <div className="contenuComm">
                        <p>{this.props.login}</p>
                        <p className={"com"+n}>{this.props.msg_comm}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Commentaire;