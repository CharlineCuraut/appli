import React, {Component} from 'react'
import Stats from './Stats'
import ListeMessages from '../messages/ListeMessages'

class BodyAccueil extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var n = this.props.isNuit() ? "V2" : ""
        return (
        <div className={"corps"+n}>
            <Stats/>
            <ListeMessages changePage={this.props.changePage} isNuit={this.props.isNuit}/>
        </div>
        )
    }
}

export default BodyAccueil;