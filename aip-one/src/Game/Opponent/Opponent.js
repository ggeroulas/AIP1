import React, { Component } from 'react';
import './Opponent.css';
import Cards from '../Cards/Cards.js'

class Opponent extends Component {

    render() {
        return(
        <div className="opponentCards"> {/* The opponents hand, with cards generated for each one */}
            <div className="cardOpp"> 
                <Cards/>
            </div>
            <div className="cardOpp">
                <Cards/>
            </div>
        </div>
        );
    }
}

export default Opponent;

