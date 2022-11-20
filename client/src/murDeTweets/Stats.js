import axios from "axios";
import React, {Component} from "react";

class Stats extends Component{
    constructor(props){
        super(props)
        this.state={
            nbUtilisateurs : 0,
            nbMessages : 0
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:4000/api/user/infos`)
            .then(res1=>{
                axios.get(`http://localhost:4000/apimessages/infos`)
                    .then(res2=>{
                        this.setState({
                            nbUtilisateurs:res1.data.count,
                            nbMessages:res2.data.count
                        })
                    })
            })
            .catch(()=>console.log("erreur stats"))
    }

    render(){
        return (
            <aside className="stats"> 
                <p> Ce site possède : </p>
                <p> {this.state.nbUtilisateurs} utilisateurs</p>
                <p> {this.state.nbMessages} messages</p>
                <br/>
                <p> Vous connaissez peut être:</p>
            </aside>
        )
    }
}

export default Stats