import React, { Component } from 'react';
//import "./Game.css"

class Score extends Component {
    constructor() {
        super();
        this.state = {
            //Should be in player
            score: 1000
        }
        this.win = this.win.bind(this);
    }

    win() {
        this.setState({ score: this.state.score + 100});
    }

    lose() {
        if(this.state.score > 0) {
            this.setState({score: this.state.score - 100});
        }
    }

    render () {
        return (
            <div className="Score">
                <p>Score: {this.state.score}</p>
            </div>
        )
    }
}

export default Score;