import React, { Component } from 'react';
import "./Game.css";

import Score from "./Game/Score.js";
import Opponent from "./Opponent";
import Player from "./Player";

class Game extends Component {
    render () {
        return (
            <div className="Game">
                <Score/>
                <Opponent/>
                <Player/>
            </div>
        )
    }
}

export default Game;