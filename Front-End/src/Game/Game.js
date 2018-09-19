import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register"

class Game extends Component {
    constructor() {
        super();
        this.state = {
            loggedin: 0 // Case 0 no one logged in, Case 1 refresh to show login, Case 2 refresh to show register, Case 3 continue to table
        };
    }

    refresh(e, x) {
        this.setState({loggedin: x});
        
    }
    
    render() {
        switch (this.state.loggedin) {
            case 0: {
                return(
                    <div>
                        <button class="btn btn-primary" onClick={(e) => this.refresh(e, 1)}>Login</button>
                        <button class="btn btn-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                        <h2>Welcome to my fully sick game!</h2>
                    </div>
                    
                );
            }
            case 1: return(
                <div>
                    <div>
                        <button class="btn btn-primary" onClick={(e) => this.refresh(e, 1)}>Login</button>
                        <button class="btn btn-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                    </div>
                    <Login/>
                </div>  
            );
            case 2: return(
                <div>
                    <div>
                        <button class="btn btn-primary" onClick={(e) => this.refresh(e, 1)}>Login</button>
                        <button class="btn btn-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                    </div>
                    <Register/>
                </div>  
            );
            case 3: return(
                <div>
                    <div>
                        <button class="btn btn-primary" onClick={(e) => this.refresh(e, 1)}>Login</button>
                        <button class="btn btn-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                    </div>
                    <Table/>
                </div>  
            );
        }
        
    }
}

export default Game;