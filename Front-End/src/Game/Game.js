import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register";
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            loggedin: 0,
             // Case 0 no one logged in, Case 1 refresh to show login, Case 2 refresh to show register, Case 3 continue to table
            loggedUser: {
                userId: null,
                username: null
            },
            userScore: ''
        };
    }

    // Callback to get Logged in user
    getLoggedUser = (id, user) => {
        this.setState(prevState => ({
            loggedUser: {
                userId: id,
                username: user
            }
        }));

        this.setState({loggedin: 3});
    }

    processRegister = () => {
        this.setState({loggedin: 1});
    }

    refresh(e, x) {
        this.setState({loggedin: x});
    }

    logout(e) {
        this.setState({loggedin: 0});
        localStorage.removeItem('token');
        this.setState(prevState => ({
            loggedUser: {
                userId: null,
                username: null
            }
        }));
    }
    
    render() {
        switch (this.state.loggedin) {
            case 0: {
                return(
                    <div>
                        <nav className="navbar navbar-dark bg-dark mb-2">
                            <div className="div-inline">
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                                <button className="btn btn-sm btn-outline-info" onClick={(e) => this.refresh(e, 2)}>Register</button>
                            </div>
                        </nav>
                        <h2>Welcome to my fully sick game!</h2>
                    </div>  
                );
            }
            case 1: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-info" onClick={(e) => this.refresh(e, 2)}>Register</button>
                        </div>
                    </nav>
                    <Login onLogin={this.getLoggedUser}/>
                </div>  
            );
            case 2: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-info" onClick={(e) => this.refresh(e, 2)}>Register</button>
                        </div>
                    </nav>
                    <Register onRegister={this.processRegister}/>
                </div>  
            );
            case 3: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <p className="text-light">Welcome {this.state.loggedUser.username}!</p>
                        <button className="btn btn-sm btn-outline-info" onClick={(e) => this.logout(e)}>Log Out</button>
                    </nav>
                    <Table/>
                </div>  
            );
        }
        
    }
}

export default Game;