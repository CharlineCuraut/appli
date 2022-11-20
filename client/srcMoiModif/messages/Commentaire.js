import React, { Component } from 'react'
import {ContextCombinedThemeAndId} from "../context/combined_context"
import ProvideCombinedContext from '../context/ProvideCombinedContext';

class Commentaire extends Component {

    render() {
        let t = this.context;
        var n = (t.contextTheme.theme === 'light') ? "" : "V2"
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
Commentaire.contextType = ContextCombinedThemeAndId;


const WrappedComm = props =>{
    return (
        <ProvideCombinedContext>
            <Commentaire 
                login={props.login}
                id_comm={props.id_comm}
                msg_comm={props.msg_comm}
            />
        </ProvideCombinedContext>
      );
}
export default WrappedComm;