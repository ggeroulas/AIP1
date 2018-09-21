import React, { Component } from 'react';
import Player from '../Player/Player';
import './Table.css';
import Opponent from '../Opponent/Opponent';

class Table extends Component {
  constructor() {
    super();
    const newDeck = this.newDeck();
    this.state = {
      score: 0, // Initialises the score for the player
      deck: newDeck,
      playerCards: [],
      opponentCards: []
    };
    this.drawCard = this.drawCard.bind(this);
    this.stay = this.stay.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.consoleLOG = this.consoleLOG.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }
  //testing reasons
  consoleLOG () {
    console.log(this.state)
  }

  // Resets and creates deck
  newDeck() {
    //clear hands and shit
    let newDeck = [];
    const suits = ['HEARTS', 'SPADES', 'CLUBS', 'DIAMONDS'];
    const names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (let s = 0; s < suits.length; s++) {
        for (let n = 0; n <= names.length - 1; n++) {
            if (n < 10) {
                newDeck.push({ suit: suits[s], value: n + 1, name: names[n]});
            } else {
                newDeck.push({ suit: suits[s], value: 10, name: names[n]});
            }
        }
    }
    for (let i = newDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = newDeck[j];
            newDeck[j] = newDeck[i];
            newDeck[i] = temp;
        }
    return newDeck;
  }

  handleNewGame() {
    const newDeck = this.newDeck();
    this.setState({ ...this.state, deck: newDeck, playerCards: [], opponentCards: []})
  }

  drawCard() {// Function to draw cards for the player
    this.setState({ //should instead pop a card from the shuffled deck and then push that card into the hand
      playerCards: [
        ...this.state.playerCards,  //set the state to be previous state plus new playerCards by overriding previous cards
        { suit: 'HEARTS', value: 5, name: '5' }
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
            <button className="btn-primary btn-sm m-2" onClick={this.consoleLOG}>CONSOLE</button>{/*testing reasons*/}
            <button className="btn-primary btn-sm m-2" onClick={this.handleNewGame}>NEW GAME</button>
          </div>
        </div>
      </div>
    );

  }
}

export default Table;