import React, { Component } from 'react';

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
        return ( // Renders each individual card
            <div className="cardVal">
                <p>{this.state.name}{this.state.suit}</p>
            </div>
        );
    }
}


export default Cards;

