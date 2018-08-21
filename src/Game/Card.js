import React, { Component } from 'react';

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            revealed: true,
            value: "Ace",
            suit: "Clubs"
        };
        this.flip = this.flip.bind(this);
    }

    flip() {
        this.setState({ revealed: !this.state.revealed });
    }

    render () {
        if(this.state.revealed === true) {
            return (
                <div>
                    <p>{this.state.value} {this.state.suit}</p>
                </div>
            )
        }
        else {
            return (
                <div className="Card">
                    <p>Hidden</p>
                </div>
            )
        }
    }
}

export default Cards;