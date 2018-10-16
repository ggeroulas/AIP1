import React, { Component } from 'react';
import Player from '../Player/Player';
import './Table.css';
import Dealer from '../Dealer/Dealer';
import axios from 'axios';
import { flipCards, drawCard, initaliseGame, evaluate, win } from '../DeckFunctions';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            score: this.getScore(), // Initialises the score for the player
            cards: { // Defines the card hand for player and dealer
                deck: [],
                playerCards: [
                    { suit: '', value: 0, name: '', flipped: false },
                    { suit: '', value: 0, name: '', flipped: false }
                ],
                dealerCards: [
                    { suit: '', value: 0, name: '', flipped: false },
                    { suit: '', value: 0, name: '', flipped: false }
                ]
            },
            stage: 1, //0 = beginning/During, 1 = evaluation 
            message: 'Press "NEXT GAME" to Start', // Message shown for in game alerts
            alert: true // determines the alert colour for end of game
        };
        this.handleDrawCard = this.handleDrawCard.bind(this);
        this.hold = this.hold.bind(this);
        this.consoleLOG = this.consoleLOG.bind(this);
        this.handleNewGame = this.handleNewGame.bind(this);
    }

    //testing reasons
    consoleLOG() {
        console.log(this.state)
    }

    // Gets the score from back end and sets the state
    getScore() {
        axios.get('user/userScore',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                //console.log(res.data);
                this.setState({ ...this.state, score: res.data.score })
            });
    }

    // removes past deck and creates new deck and cards
    handleNewGame() {
        let cards = initaliseGame(2);
        const instantWin = (evaluate(cards.playerCards) === 21);
      
        if (instantWin) {
            cards.dealerCards = flipCards(cards.dealerCards);
        }

        this.setState({
            ...this.state,
            score: (instantWin ? this.changeScore(true) : this.getScore()),
            cards: cards,
            stage: (instantWin ? 1 : 0),
            message: (instantWin ? "You Have 21! You Win!" : ""),
            alert: (instantWin ? true : false)
        });
    }

    handleDrawCard() {// Function to draw cards for the player, also handles if player busts or gets blackjack
        const newCards = drawCard(this.state.cards.deck, this.state.cards.playerCards);
        const instantWin = (evaluate(newCards.hand) === 21);
        const bust = (evaluate(newCards.hand) > 21);

        if (instantWin || bust) {
            newCards.dealerCards = flipCards(this.state.cards.dealerCards);
        }

        this.setState({
            ...this.state,
            score: (instantWin ? this.changeScore(true) : (bust ? this.changeScore(false) : this.getScore())),
            cards: {
                ...this.state.cards,
                deck: newCards.deck,
                playerCards: newCards.hand
            },
            message: ( bust ? "Busted! You Lose" : (instantWin ? "You Have 21 You Win!" : "")),
            stage: ((bust || instantWin) ? 1 : 0),
            alert: (instantWin ? 1 : 0)
        });
    }

    hold() {// Function to action the player to hold their hand, also handles evaluation of winner
        const results = win(this.state.cards.playerCards, this.state.cards.dealerCards)
        
        this.setState({
            ...this.state,
            score: this.changeScore(results.win),
            cards: {
                ...this.state.cards,
                dealerCards: flipCards(this.state.cards.dealerCards)
            },
            message: results.message,
            alert: results.alert,
            stage: 1
        });
    }

    evaluate(hand) { // evaluates the points for a hand
        let total = 0;
        let aces = 0;
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].value !== 1) {
                total += hand[i].value;
            } else {
                aces++;
            }
        }
        if (aces !== 0) {
            total += (aces - 1);
            if (total <= 10) total += 11;
            else total++;
        };
        return total;
    }

    // Changes score after a game, changes are pushed to the db
    changeScore(didWin) {
        const data = {
            win: (didWin) ? 1 : 0
        }
        const axiosConfig = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.post('/user/scoreUpdate', data, axiosConfig)
            .then((res) => {
                return this.getScore();
            });
    }

    render() {
        return (
            <div className="container" hidden={this.props.hide}>
                <div className="score card bg-white"> {/* Shows the score */}
                    <p>Score: {this.state.score}</p>
                </div>
                <div className="container-fluid oval"> {/* Renders the game table, player hand and dealer hand */}
                    <div className="container cln pt-3 pb-3">
                        <Dealer cards={this.state.cards.dealerCards} /> 
                        <img className="shark container flex-container" src="./images/shark.png" alt="shark" />
                        <Player cards={this.state.cards.playerCards} />
                    </div>
                </div>
                {/* Alerts show the players current points and then shows messages at the end of each game i.e. winner/loser */}
                <p className="text-center center msgBox mt-2 alert alert-info" hidden={this.state.message !== ''}>Your hand: {evaluate(this.state.cards.playerCards)}</p>
                <p className={"text-center center msgBox mt-2 alert alert-" + ((this.state.alert) ? "success" : "danger")} hidden={this.state.message === ''}>{this.state.message}</p>
                <div>
                    {/* The player menu allowing them to draw cards, hold their hand, or start the next game */}
                    <div className="flex-container mt-2">
                        <button
                            className={'btn-' + ((this.state.stage === 1) ? 'secondary' : 'primary') + ' btn-sm m-2'}
                            disabled={(this.state.stage === 1)}
                            onClick={this.handleDrawCard}
                        >
                            HIT
                        </button>
                        <button
                            className={'btn-' + ((this.state.stage === 1) ? 'secondary' : 'primary') + ' btn-sm m-2'}
                            disabled={(this.state.stage === 1)}
                            onClick={this.hold}
                        >
                            STAND
                        </button>
                        <button
                            className={'btn-' + ((this.state.stage !== 1) ? 'secondary' : 'primary') + ' btn-sm m-2'}
                            disabled={(this.state.stage !== 1)}
                            onClick={this.handleNewGame}
                        >
                            NEXT GAME
                        </button>
                    </div>
                </div>
            </div>
        );

    }
}

export default Table;