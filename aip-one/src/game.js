import React, { Component } from 'react';
import './App.css';
import Player from './player'
import Opponent from './opponent'
//♠	♥	♦	♣

class Game extends Component {
    constructor() {
      super();
      this.state = { score: 0};
  
    }

    draw() {}
  
    stay() {}
  
    render() {
        const score = this.state.score;
        return(

        <div  className="Game">
          <div className="Score">
            <p>Score: {score}</p>
          </div>
          <Opponent/>
          <Player/>
          

          <div className="Choice">
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