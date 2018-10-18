import React, { Component } from 'react';
import './Cards.css';
import { CLUBS, DIAMONDS, HEARTS, SPADES } from '../TableConstants';

class Cards extends Component {

    // Converts the suit String to unicode character
    changeSuit(suit) {
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

    render() {
        // pass the card object { suit, value, name, flipped } as props 
        const { card } = this.props;
        const suit = this.changeSuit(card.suit);
        // Renders each individual card value, checks if flipped to apply different css
        return ( 
            <div>
                {card.flipped ? (
                    <p>{card.name}{suit}</p>
                ) : ( // Image that goes on back of card
                    <img className="cardBack" src="./images/shark.png" alt="Flipped" />
                )}
            </div>
        );
    }
}

export default Cards;