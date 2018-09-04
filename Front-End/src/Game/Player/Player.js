import React, { Component } from 'react';
import './Player.css';
import Cards from '../Cards/Cards.js'


class Player extends Component {
    
    render() {
        const { cards } = this.props;
        return(
            <div className="playerCards"> {/* Renders the players card hand */}
                <div className="card-flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card) => {
                        return ( 
                            <div className="cardPlayer">
                               <Cards card={card}/>
                            </div>
                        );
                    })}
                </div>
            </div>  
        );
    }
}

export default Player;