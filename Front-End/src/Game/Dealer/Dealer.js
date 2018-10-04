import React, { Component } from 'react';
import './Dealer.css';
import Cards from '../Cards/Cards'

class Dealer extends Component {

    render() {
        const { cards, stage } = this.props;
        return(

            <div className="container flex-container">
                    {/*takes each card in cards and pass it to be rendered as a card */}
                    {cards.map((card, index) => {
                        return ( 
                            <div key={index} className={"card cln cardOpp m-2 " + ((stage !== 3) ? 'bg-info': '')}> {/*bg-info*/}
                               <Cards card={card}/>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

export default Dealer;

