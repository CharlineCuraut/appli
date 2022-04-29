import React, {Component} from "react"

class Recherche extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="recherche_container">
                <label htmlFor="barre_r" id="label_recherche">Barre de recherche</label>
                <br/>
                <div className="barreBoutonTri">
                    <div className="barreBouton">
                        <input type="text" id="barre_r"/>
                        <button type="submit" name="recherche" id="bouton_rech">Rechercher</button>
                    </div>
                    <div className="filtres">
                        <input type="checkbox" id="contact1" name="contact1" defaultChecked/>
                        <label htmlFor="contact1">Trier par contact</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recherche