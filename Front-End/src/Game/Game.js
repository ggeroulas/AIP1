import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register";
import HighScore from "../HighScore/HighScore";
import GameRules from "./GameRules/GameRules";
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        let gameState = 0;
        if (localStorage.getItem('token') && this.getLoggedUser()) {
            gameState = 3;
        }
        this.state = {
            loggedin: gameState,
             // Case 0 no one logged in, Case 1 refresh to show login, Case 2 refresh to show register, Case 3 continue to table
            loggedUser: {
                userId: null,
                username: null
            },
            registered: false,
            tableState: 0 // 0 loads table, 1 loads high score, 2 loads game rules
        };
    }

    // Callback to get Logged in user
    getLoggedUser = () => {
        try {
            axios.get('/user',
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                this.setState(prevState => ({
                    loggedUser: {
                        userId: res.data.user.id,
                        username: res.data.user.username
                    },
                    loggedin: 3
                }));
                return true;
            }); 
        } catch (err) {
            localStorage.removeItem('token');
            return false;
        }
           
    }

    processRegister = () => {
        this.setState({loggedin: 1, registered: true});
        console.log(this.state);
    }

    changeRegister = () => {
        this.setState({registered: false})
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

    handleTableState(e, n) {
        this.setState({tableState: n})
    }
    
    render() {
        switch (this.state.loggedin) {
            case 0: { //the Navbar should be a separate component
                return(
                    <div>
                        <nav className="navbar navbar-dark bg-dark mb-2">
                            <div className="div-inline">
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 0)}>Home</button>
                                <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                                <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 2)}>Register</button>
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                            </div>
                            <button hidden={(this.state.loggedUser.userId === null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.logout(e)}>Log Out</button>
                        </nav>
                        <HighScore hdn={1}/>
                    </div>  
                );
            }
            case 1: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 0)}>Home</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 2)}>Register</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                        </div>
                    </nav>
                    <Login onLogin={this.getLoggedUser} registered={this.state.registered} afterRegister={this.changeRegister}/>
                </div>  
            );
            case 2: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 0)}>Home</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 2)}>Register</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                        </div>
                    </nav>
                    <Register onRegister={this.processRegister}/>
                </div>  
            );
            case 3: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                            <div className="div-inline">
                                <a className="text-secondary text-outline-secondary mr-3">Welcome {this.state.loggedUser.username}!</a>
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.handleTableState(e, 0)}>Game</button>
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.handleTableState(e, 1)}>HighScore</button>
                                <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.handleTableState(e, 2)}>Game Rules</button>
                            </div>
                            <button hidden={(this.state.loggedUser.userId === null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.logout(e)}>Log Out</button>
                        </nav>
                    <Table hdn={this.state.tableState}/>
                    <GameRules hdn={this.state.tableState}/>
                    <HighScore hdn={this.state.tableState}/>
                </div>  
            );
            case 4: return(
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 0)}>Home</button>
                            <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 1)}>Login</button>
                            <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 2)}>Register</button>
                            <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                        </div>
                    </nav>
                    <GameRules hdn={2}/>
                </div>  
            );
            default:
            break;
        }
        
    }
}

export default Game;