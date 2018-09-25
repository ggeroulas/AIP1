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

    for (var i = 0; i < 2; i++) {
      this.state.playerCards.push(this.state.deck.pop());
      this.state.opponentCards.push(this.state.deck.pop());
    }
    this.opponentDraw();
    // this.opponentDraw = this.drawCard.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.stay = this.stay.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.consoleLOG = this.consoleLOG.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }
  //testing reasons
  consoleLOG () {
    console.log(this.state)
  }

  // Resets and creates deck
  newDeck() {
    // Creates new Deck
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
    // Shufffles the deck
    for (let i = newDeck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = newDeck[j];
            newDeck[j] = newDeck[i];
            newDeck[i] = temp;
        }
    return newDeck;
  }

  // Does not work
  handleNewGame() {
    const newDeck = this.newDeck();
    this.setState({ ...this.state, deck: newDeck, playerCards: [], opponentCards: []})
    for (var i = 0; i < 2; i++) {
      this.state.playerCards.push(this.state.deck.pop());
      this.state.opponentCards.push(this.state.deck.pop());
    }
  }
  
  // Automates opponent draw, recursive if hand less than 14
  opponentDraw() {
    if (this.evaluate(this.state.opponentCards) <= 14) {
      this.state.opponentCards.push(this.state.deck.pop());
      this.opponentDraw();
    }
  }

  drawCard() {// Function to draw cards for the player
    this.state.playerCards.push(this.state.deck.pop());
    if (this.evaluate(this.state.playerCards) > 21) {
      alert("Busted"); // add delay
    }
  }

  stay() {// Function to action the player to hold their hand
    const playerPoints = this.evaluate(this.state.playerCards);
    const oppPoints = this.evaluate(this.state.opponentCards)
    if (playerPoints > oppPoints) {
      alert('Winner: ' + playerPoints);
      this.changeScore(true);
    } else if (playerPoints === oppPoints) {
      alert ('Draw, You Win: ' + playerPoints);
      this.changeScore(true);
    } else {
      alert('Loser: ' + playerPoints);
      this.changeScore(false);
    }
  }

  evaluate(hand) { //evaluates the points for a hand
    let total = 0;
    let aces = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value !== 1) {
            total += hand[i].value;
        } else {
            aces++;
        }
    }
    for (let i = 0; i < aces; i++) {
        if (total <= 10) total += 11;
        else total += 1;
    }
    return total;
  }

  // Changes score should push to db
  changeScore(win) {
    let change = (win) ? 100 : -100;
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