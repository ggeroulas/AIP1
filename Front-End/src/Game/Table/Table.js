import React, { Component } from 'react';
import Player from '../Player/Player';
import './Table.css';
import Opponent from '../Opponent/Opponent';
import { HEARTS, DIAMONDS, CLUBS, SPADES } from '../Cards/cardTypes';


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

      <div className="container-fluid card back">
        <div className="score"> {/* Shows the score */}
          <p>Score: {this.state.score}</p>
        </div>
        <div className="container">
          <Opponent cards={this.state.opponentCards} /> {/* Renders the opponent cards */}
          <Player cards={this.state.playerCards} /> {/* Renders the players cards */}
        </div>
        <div> {/* The player menu allowing them to draw cards, hold their hand, or start the next game */}
          <div className="flex-container mt-5">
            <button className="btn-primary btn-sm m-2" onClick={this.drawCard}>DRAW</button>
            <button className="btn-primary btn-sm m-2" onClick={this.stay}>STAY</button>
            <button className="btn-secondary btn-sm m-2">NEXT GAME</button>
          </div>
        </div>
      </div>
    );

  }
}

export default Table;