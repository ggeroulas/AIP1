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
                user: false,
                userId: null,
                username: null
            },
            registered: false
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
                        user: true,
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
    
    render() {
        if (this.state.loggedUser.user) {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-dark mb-2">
                        <div className="div-inline">
                            <button className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 0)}>Home</button>
                            <button className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 3)}>Play!</button>                            
                            <button className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={(e) => this.logout(e)}>Log Out</button>
                        </div>
                        <a className="text-secondary text-outline-secondary mr-1">Welcome {this.state.loggedUser.username}!</a>
                        </nav>
                    <HighScore hide={this.state.loggedin !== 0} user={this.state.loggedUser.user}/>
                    <Table hide={this.state.loggedin !== 3}/>
                    <GameRules hide={this.state.loggedin !== 4}/>
                </div>
            )
        } else {
            return (
                <div> 
                    <nav className="navbar navbar-dark bg-dark mb-2">
                         <div className="div-inline">
                             <button className="btn btn-sm btn-outline-info mr-3" onClick={(e) => this.refresh(e, 0)}>Home</button>
                             <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 1)}>Login</button>
                             <button hidden={(this.state.loggedUser.userId !== null)} className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 2)}>Register</button>
                             <button hidden={(this.state.loggedUser.userId === null)} className="btn btn-sm btn-outline-info mr-1" onClick={(e) => this.refresh(e, 3)}>Play!</button>
                             <button className="btn btn-sm btn-outline-info mr" onClick={(e) => this.refresh(e, 4)}>Game Rules</button>
                         </div>
                     </nav>
                     <HighScore hide={this.state.loggedin !== 0} user={this.state.loggedUser.user}/>
                     <Login hide={this.state.loggedin !== 1} onLogin={this.getLoggedUser} registered={this.state.registered} afterRegister={this.changeRegister} />
                     <Register hide={this.state.loggedin !== 2} onRegister={this.processRegister}/>
                     <GameRules hide={this.state.loggedin !== 4}/>
                </div>
            )
        }
    }
}

export default Game;