import React, { Component } from 'react';
import Cards from '../Cards/Cards.js';
import './Player.css';

class Player extends Component {
    
    render() {
        const { cards } = this.props; // Players cards are passed down using props
        return(
            <div className="container flex-container mt-4">
                {/*takes each card in cards and pass it to be rendered as a card */}
                {cards.map((card, index) => {
                    return ( 
                        <div key={index}className={((this.props.player === "PLAYER") ? "card cln cardPlayer m-2 " : "card cln cardOpp m-2 ") + ((!card.flipped) ? "bg-info": "")}> {/* Produces card shapes and styling*/}
                            <Cards card={card}/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Player;