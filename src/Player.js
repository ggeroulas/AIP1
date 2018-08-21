import React, { Component } from 'react';
import Cards from "./Game/Card";

class Player extends Component {
    constructor() {
        super();
        this.state = {

        }
    }



    render () {
        return (
            <div>
                <h1>YOUR Cards</h1>
                <span><Cards/></span><span><Cards/></span>
                <button>Another Card!</button>
                <button>Continue</button>
            </div>
        )
    }
}

export default Player;