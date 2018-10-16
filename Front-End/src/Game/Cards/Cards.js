import React, { Component } from 'react';
import './Cards.css';

class Cards extends Component {

    changeSuit(suit) {
        switch (suit) {
            case 'CLUBS':
                return "♣";
            case 'DIAMONDS':
                return "♦";
            case 'HEARTS':
                return "♥";
            case 'SPADES':
                return "♠";
            default:
                return "";
        }
    }

    render() {
        const { card } = this.props;
        const suit = this.changeSuit(card.suit);
        return ( // Renders each individual card value
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

