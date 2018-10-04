import React, { Component } from 'react';
import './Player.css';
import Cards from '../Cards/Cards.js'


class Player extends Component {
    
    render() {
        const { cards } = this.props;
        console.log('player',cards)
        return(
                <div className="container flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card, index) => {
                        return ( 
                            <div key={index}className="card cln cardPlayer m-2">
                               <Cards card={card}/>
                            </div>
                        );
                    })}
                </div>
           
        );
    }
}

export default Player;