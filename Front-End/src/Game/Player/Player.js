import React, { Component } from 'react';
import './Player.css';
import Cards from '../Cards/Cards.js'

class Player extends Component {

    render() {
        return(
            <div className="playerCards"> {/* Renders the players card hand */}
                <div className="cardPlayer">
                    <Cards/>
                </div>
                <div className="cardPlayer">
                    <Cards/>
                </div>
            
            </div>
        );
    }
}

export default Player;