import React, {Component} from "react"
import logo from "../images/logo.png"
import logoV2 from "../images/logoV2.png"

class Logo extends Component {
    constructor(props) {
        super(props)
        this.main = this.main.bind(this)
    }

    main() {
        this.props.changePage('pageAccueil')
    }

    render() {
        var l = this.props.isNuit() ? logoV2 : logo
        return (
            <div onClick = {this.main}>
                <img className="logo" src={l} alt="logo" />
            </div>
        )
    }
}

export default Logo