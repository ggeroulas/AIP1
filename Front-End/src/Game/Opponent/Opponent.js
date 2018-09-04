import React, { Component } from 'react';
import './Opponent.css';
import Cards from '../Cards/Cards.js'

class Opponent extends Component {

    render() {
        const { cards } = this.props;
        return(
            <div className="opponentCards"> {/* Renders the players card hand */}
                <div className="card-flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card) => {
                        return ( 
                            <div className="cardOpp">
                               <Cards card={card}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Opponent;

