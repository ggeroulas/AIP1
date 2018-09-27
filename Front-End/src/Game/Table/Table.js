import React, { Component } from 'react';
import Player from '../Player/Player';
import './Table.css';
import Dealer from '../Dealer/Dealer';

class Table extends Component {
  constructor() {
    super();
    let cards = this.startGame()
    this.state = {
      score: 0, // Initialises the score for the player
      cards: {
        deck: cards.deck,
        playerCards: cards.playerCards,
        dealerCards: cards.dealerCards
      }
    };

    this.startGame = this.startGame.bind(this);
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

  //initialises new deck and card
  startGame() {
    let deck = this.newDeck();
    let playerCards = [];
    let dealerCards = [];
    // Draws Cards for players
    for (var i = 0; i < 2; i++) {
      playerCards.push(deck.pop());
      dealerCards.push(deck.pop());
    }
    //dealers extra cards could be done after so it looks nicer
    while (this.evaluate(dealerCards) <= 14) {
      dealerCards.push(deck.pop());
    }

    return {deck, playerCards, dealerCards};
  }

  // removes past deck and creates new deck and cards
  handleNewGame() {
    this.setState({...this.state, cards: 
        {
          ...this.state.cards, 
          deck: [], 
          playerCards: [], 
          dealerCards: []
        }
      },
      () => {
        console.log('handleNewGame');
        let newCards = this.startGame();
        this.setState({...this.state, cards: newCards});
      }
    );
  }

  drawCard() {// Function to draw cards for the player
    let newDeck = this.state.cards.deck;
    let newPlayerCards = this.state.cards.playerCards;
    newPlayerCards.push(newDeck.pop());
    this.setState({...this.state, cards:
      {
        ...this.state.cards,
        deck: newDeck,
        playerCards: newPlayerCards
      }})
    if (this.evaluate(this.state.cards.playerCards) > 21) {
      alert("Busted"); // add delay
    }
  }

  stay() {// Function to action the player to hold their hand
    const playerPoints = this.evaluate(this.state.cards.playerCards);
    const dealerPoints = this.evaluate(this.state.cards.dealerCards)
    if (playerPoints > dealerPoints) {
      alert('Winner: ' + playerPoints);
      this.changeScore(true);
    } else if (playerPoints === dealerPoints) {
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
    if (total > 21) return 0;
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
        {console.log(this.state)}
          <Dealer cards={this.state.cards.dealerCards} /> {/* Renders the dealer cards */}
          <Player cards={this.state.cards.playerCards} /> {/* Renders the players cards */}
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