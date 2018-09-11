import React, { Component } from 'react';
import './Table.css';
import Player from '../Player/Player'
import Opponent from '../Opponent/Opponent'
import { HEARTS, DIAMONDS, CLUBS, SPADES } from '../Cards/cardTypes';
import Button from '@material-ui/core/Button';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      score: 0, // Initialises the score for the player
      playerCards: [
        { suit: CLUBS, value: "6" },
        { suit: HEARTS, value: "7" },
        { suit: HEARTS, value: "7" }
      ],
      opponentCards: [
        { suit: CLUBS, value: "6" },
        { suit: HEARTS, value: "7" }
      ]
    };
    this.drawCard = this.drawCard.bind(this);
    this.stay = this.stay.bind(this);
    this.changeScore = this.changeScore.bind(this);
  }

  drawCard() {// Function to draw cards for the player
    this.setState({ //should instead pop a card from the shuffled deck and then push that card into the hand
      playerCards: [
        ...this.state.playerCards,  //set the state to be previous state plus new playerCards by overriding previous cards
        { suit: HEARTS, value: "5" }
      ]
    });
  }

  stay() {// Function to action the player to hold their hand
    console.log("stay");
    //todo
    this.changeScore(true); //temp
  }

  changeScore(win) {
    var change = (win) ? 100 : -100;
    this.setState({ score: this.state.score + change });
  }

  render() {
    return (

      <div className="Game">
        <div className="Score"> {/* Shows the score */}
          <p>Score: {this.state.score}</p>
        </div>
        <div>
          <Opponent cards={this.state.opponentCards} /> {/* Renders the opponent cards */}
          <Player cards={this.state.playerCards} /> {/* Renders the players cards */}
        </div>
        <div className="Choice"> {/* The player menu allowing them to draw cards, hold their hand, or start the next game */}
          <Button variant="outlined" color="primary" className="button" onClick={this.drawCard}>DRAW</Button>
          <Button variant="outlined" color="primary" className="button" onClick={this.stay}>STAY</Button>
        </div>
        <br />
        <Button variant="outlined" color="primary" id="nextGame">NEXT GAME</Button>
      </div>
    );

  }
}

export default Table;