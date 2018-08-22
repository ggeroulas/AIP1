import React, { Component } from 'react';
import './App.css';

class Player extends Component {

    render() {
        return(
            <div className="playerCards">
                <div className="cardPlayer">
                    <p>4♠</p>
                </div>
                <div className="cardPlayer">
                    <p>10♠</p>
                </div>
            
            </div>
        );
    }
}

export default Player;