import React, { Component } from 'react';
import './Dealer.css';
import Cards from '../Cards/Cards'

class Dealer extends Component {

    render() {
        const { cards } = this.props;
        console.log('opponent',cards)
        return(

            <div className="container flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card, index) => {
                        return ( 
                            <div key={index} className="card cln cardOpp m-2 bg-info">
                               <Cards card={card}/>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export default Dealer;

