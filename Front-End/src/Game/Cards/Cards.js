import React, { Component } from 'react';
import './Cards.css';
import { HEARTS, DIAMONDS, CLUBS, SPADES } from './cardTypes';

class Cards extends Component {
    state = { suit: null, value: null }

    changeSuit = (suit) => {
        switch (suit) {
            case CLUBS:
                return "♣";
            case DIAMONDS:
                return "♦";
            case HEARTS:
                return "♥";
            case SPADES:
                return "♠";
            default:
                return "";
        }
    }

    componentWillMount() {
        const suit = this.changeSuit(this.props.card.suit);
        this.setState({
            value: this.props.card.value,
            suit
        })
    }

    render() {
        return ( // Renders each individual card
            <div>
                <p>{this.state.value}{this.state.suit}</p>
            </div>
        );
    }
}


export default Cards;

