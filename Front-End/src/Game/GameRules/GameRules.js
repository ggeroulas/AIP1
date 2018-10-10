import React, { Component } from 'react';
import './GameRules.css';

class GameRules extends Component {

    render() {
        
        return(

            <div className="card rules center p-2" hidden={this.props.hide}>
                <h4>Game Rules</h4>
                <p>The object of CardShark is to achieve a total of 21 points or a points
                sum greater than the dealer. You start with 2 cards, the sum of which 
                determines your amount of points. All card numbers reflect a relevant amount of 
                points. The exceptions are King, Queen and Jack which are all worth 10. As well 
                as Ace which can be either 1 or 11.</p>

                <p>You may click <button className="btn-primary btn-sm">HIT</button> until you have a desired amount of cards, or until
                you reach a sum greater than 21. If this occurs, your hand of cards is 
                bust and the dealer automatically wins the round.</p>

                <p>If you do not wish to draw more cards you may <button className="btn-primary btn-sm">STAND</button> your hand which will 
                determine a winner for the round.</p>

                <p>Once a winner is determined, you may click <button className="btn-primary btn-sm">Next Game</button> which will begin 
                the next round. Winning gains the player 100 pts, losing removes 100pts.</p>
            </div>
        );
    }
}

export default GameRules;

