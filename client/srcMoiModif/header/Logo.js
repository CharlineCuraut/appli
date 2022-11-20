import React, {Component} from "react"
import logo from "../images/logo.png"
import logoV2 from "../images/logoV2.png"
import {ThemeContext} from "../context/theme_context"


class Logo extends Component {
    constructor(props) {
        super(props)
        this.main = this.main.bind(this)
    }

    main() {
        this.props.changePage('pageAccueil', "")
    }

    render() {
        let t = this.context;
        var l = (t.theme === 'light') ? logo : logoV2
        return (
            <div onClick = {this.main}>
                <img className="logo" src={l} alt="logo" />
            </div>
        )
    }
}
Logo.contextType = ThemeContext;

export default Logo