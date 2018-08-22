import React, { Component } from 'react';
import './App.css';

class Opponent extends Component {

    render() {
        return(
        <div className="opponentCards">
            <div className="cardOpp">
                <p>6♣</p>
            </div>
            <div className="cardOpp">
                <p>A♣</p>
            </div>
        </div>
        );
    }
}

export default Opponent;

