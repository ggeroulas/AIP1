import React, { Component } from 'react';
import './Game.css';
import Player from './Player/Player'
import Opponent from './Opponent/Opponent'
//♠	♥	♦	♣

class Game extends Component {
    constructor() {
      super();
      this.state = { score: 0}; // Initialises the score for the player
  
    }

    draw() {} // Function to draw cards for the player
  
    stay() {} // Function to action the player to hold their hand
  
    render() {
        const score = this.state.score; // Passes the score down from the state
        return(

        <div  className="Game">
          <div className="Score"> {/* Shows the score */}
            <p>Score: {score}</p>
          </div>
          <Opponent/> {/* Renders the opponent cards */}
          <Player/> {/* Renders the players cards */}
          

          <div className="Choice"> {/* The player menu allowing them to draw cards, hold their hand, or start the next game */}
            <button className="button" onClick={this.draw}>DRAW</button>
            <button className="button" onClick={this.stay}>STAY</button>
          </div>
          <br/>
          <button id="nextGame">NEXT GAME</button>
        </div>
        );

    }
}

export default Game;