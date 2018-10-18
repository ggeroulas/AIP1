import React, { Component } from 'react';
import Cards from '../Cards/Cards.js';
import './Player.css';
import { PLAYER } from '../TableConstants.js';

class Player extends Component {
    
    render() {
        // Component passed two props 1. The type of player (DEALER/PLAYER), 2. The players hand (cards), an array of card objects
        const { cards } = this.props; 
        return(
            <div className="container flex-container mt-4">
                {/*takes each card in cards and pass it to be rendered as a card */}
                {cards.map((card, index) => {
                    return ( 
                        <div key={index} 
                            // Produces card shapes and styling dependent on type of player and whether the cards is flipped   
                            className={((this.props.player === PLAYER) ? "card cln cardPlayer m-2 " : "card cln cardOpp m-2 ") + ((!card.flipped) ? "bg-info": "")}
                        > 
                            <Cards card={card}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Player;