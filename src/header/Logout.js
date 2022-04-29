import React, { Component } from 'react';

class Logout extends Component{

    render() {
        return (
        <div id="co">
            <button type="submit" name="deconnexion"  onClick={this.props.setLogout}>Déconnexion</button>
        </div>
        )
    }
}

export default Logout;