import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register"

class Game extends Component {
    constructor() {
        super();
        this.state = {
            loggedin: false //toggle for now
        };
    }
    
    render() {
        if (!this.state.loggedin) {
            return (
                <div>
                    <span><Login/></span>
                    <span><Register/></span>
                </div>
            )
        } else {
            return (
                <div>
                    <Table/>  
                </div>
            )
        }
    }
}

export default Game;