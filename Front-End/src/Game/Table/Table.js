import React, { Component } from 'react';
import Player from '../Player/Player';
import './Table.css';
import Dealer from '../Dealer/Dealer';
import axios from 'axios';

class Table extends Component {
  constructor() {
    super();
    let cards = this.startGame();
    const score = this.getScore();
    this.state = {
      score: 0, // Initialises the score for the player
      cards: {
        deck: cards.deck,
        playerCards: cards.playerCards,
        dealerCards: cards.dealerCards
      },
      stage: 0
      //bust: false
    };

    this.getScore = this.getScore.bind(this);
    this.startGame = this.startGame.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.stay = this.stay.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.consoleLOG = this.consoleLOG.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.flipCard = this.flipCard.bind(this);
  }
  //testing reasons
  consoleLOG () {
    console.log(this.state)
  }

  // Gets the score
  getScore() {
    let score = 0;
    axios.get('user/userScore', 
    {
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((res) => {
      //console.log(res.data);
      this.setState({...this.state, score: res.data.score})//should wait and set the score in the beginning
    });
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
                newDeck.push({ suit: suits[s], value: n + 1, name: names[n], flipped: false});
            } else {
                newDeck.push({ suit: suits[s], value: 10, name: names[n], flipped: false});
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
      playerCards.push(this.flipCard(deck.pop()));
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

  flipCard(card) {
    card.flipped = true;
    return card;
  }

  drawCard() {// Function to draw cards for the player
    let newDeck = this.state.cards.deck;
    let newPlayerCards = this.state.cards.playerCards;
    newPlayerCards.push(this.flipCard(newDeck.pop()));
    this.setState({...this.state, cards:
      {
        ...this.state.cards,
        deck: newDeck,
        playerCards: newPlayerCards
      }
    },
      () => {
        console.log(this.state);
        console.log('Hello');
        if (this.evaluate(this.state.cards.playerCards) > 21) {
          //this.setState({...this.state, bust: true});
          alert("Busted"); // add delay
        }
      }
    );
  }

  stay() {// Function to action the player to hold their hand
    this.setState({ stage: 3 });
    const playerPoints = this.evaluate(this.state.cards.playerCards);
    const dealerPoints = this.evaluate(this.state.cards.dealerCards)
    for (let i = 0; i < this.state.cards.dealerCards.length; i++) {
      this.state.cards.dealerCards[i] = this.flipCard(this.state.cards.dealerCards[i]);
    }
    if (dealerPoints > 21) {
      alert('Dealer Bust, You Win!');
    } else if (playerPoints > dealerPoints && dealerPoints < 21) {
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
    return total;
  }

  // Changes score should push to db
  changeScore(win) {
    let newScore = this.state.score + ((win) ? 100 : -100);
    console.log(newScore);
    
    const data = {
      score: newScore
    }
    const axiosConfig = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.post('/user/scoreUpdate', data, axiosConfig)
      .then((res) => {
        console.log(res);
      });

    this.setState({ score: newScore });
  }

  render() {
      return (
      <div className="container-fluid card back">
        <div className="score"> {/* Shows the score */}
          <p>Score: {this.state.score}</p>
        </div>
        <div className="container">
          <Dealer cards={this.state.cards.dealerCards} stage={this.state.stage} /> {/* Renders the dealer cards */}
          <Player cards={this.state.cards.playerCards} /> {/* Renders the players cards */}
        </div>
        <div> {/* The player menu allowing them to draw cards, hold their hand, or start the next game */}
          <div className="flex-container mt-5">
            <button className="btn-primary btn-sm m-2" onClick={this.drawCard}>DRAW</button> {/*disabled={this.state.bust} */}
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