import React, { Component } from 'react';
import Cards from "./Game/Card";

class Opponent extends Component {
    render () {
        return (
            <div>
                <h1>Opponent</h1>
                <Cards/><Cards/>
            </div>
        )
    }
}

export default Opponent;