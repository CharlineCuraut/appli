import React, {Component} from 'react'
import Stats from './Stats'
import ListeMessages from '../messages/ListeMessages'
import {ThemeContext} from "../context/theme_context"
import axios from "axios";


class BodyMurDeTweets extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nbMessTotal : -1
        }
        this.recupereNbMess = this.recupereNbMess.bind(this);
    }

    async recupereNbMess() {
        await axios.get("http://localhost:4000/apimessages/infos")
            .then((res) => {
                console.log("j'ai récupéré le nb de message dans la db : " + res.data['count']);
                this.setState({
                    nbMessTotal : res.data['count']
                })

            })
    }

    render(){
        let t = this.context;
        var n = (t.theme === 'light') ? "" : "V2"
        if (this.state.nbMessTotal === -1) this.recupereNbMess();

        return (
        <div className={"corps"+n}>
            <Stats nbMessTotal={this.state.nbMessTotal}/>
            <ListeMessages changePage={this.props.changePage} nbMessTotal={this.state.nbMessTotal} recupereNbMess={this.recupereNbMess}/>
        </div>
        )
    }
}
BodyMurDeTweets.contextType = ThemeContext;

export default BodyMurDeTweets;