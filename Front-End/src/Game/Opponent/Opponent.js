import React, { Component } from 'react';
import './Opponent.css';
import Cards from '../Cards/Cards.js'

class Opponent extends Component {

    render() {
        const { cards } = this.props;
        return(

            <div className="container flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card) => {
                        return ( 
                            <div className="card cln cardOpp m-2 bg-info">
                               <Cards card={card}/>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export default Opponent;

