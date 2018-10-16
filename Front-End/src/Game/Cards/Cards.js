import React, { Component } from 'react';
import './Cards.css';

class Cards extends Component {
    state = { suit: null, value: null, name: null }

    changeSuit = (suit) => {
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

    componentWillMount() {
        const suit = this.changeSuit(this.props.card.suit);
        this.setState({
            name: this.props.card.name,
            suit
        })
    }

    render() {
        return ( // Renders each individual card value
            <div>
                {this.props.card.flipped ? (
                    <p>{this.state.name}{this.state.suit}</p>
                ) : ( // Image that goes on back of card
                    <img className="cardBack" src="./images/shark.png" alt="Flipped" />
                )}
            </div>
        );
    }
}


export default Cards;

