import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register"

class Game extends Component {
    constructor() {
        super();
        this.state = {
            loggedin: 3
             // Case 0 no one logged in, Case 1 refresh to show login, Case 2 refresh to show register, Case 3 continue to table
        };
    }

    refresh(e, x) {
        this.setState({loggedin: x});
    }

    logout(e) {
        this.setState({loggedin: 0});
        // need to call a function here that kills the session
    }
    
    render() {
        switch (this.state.loggedin) {
            case 0: {
                return(
                    <div>
                        <nav className="navbar navbar-light bg-light mb-5">
                            <div className="div-inline">
                                <button className="btn btn-sm btn-outline-secondary mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                            </div>
                        </nav>
                        <h2>Welcome to my fully sick game!</h2>
                    </div>  
                );
            }
            case 1: return(
                <div>
                    <nav className="navbar navbar-light bg-light mb-5">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-secondary mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                        </div>
                    </nav>
                    <Login/>
                </div>  
            );
            case 2: return(
                <div>
                    <nav className="navbar navbar-light bg-light mb-5">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-secondary mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={(e) => this.refresh(e, 2)}>Register</button>
                        </div>
                    </nav>
                    <Register/>
                </div>  
            );
            case 3: return(
                <div>
                    <nav className="navbar navbar-light bg-light">
                        <p classNameName="navbar-brand">Welcome Mr. Schneebly!</p>
                        <button className="btn btn-sm btn-outline-secondary" onClick={(e) => this.logout(e)}>Log Out</button>
                    </nav>
                    <Table/>
                </div>  
            );
        }
        
    }
}

export default Game;