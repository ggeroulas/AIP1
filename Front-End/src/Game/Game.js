import React, { Component } from 'react';
import Table from './Table/Table';
import Login from '../Login/Login';
import Register from "../Register/Register";
import HighScore from "../HighScore/HighScore";
import GameRules from "./GameRules/GameRules";
import Navigation from "./Navigation/Navigation";
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
        this.refresh = this.refresh.bind(this);
        this.logout = this.logout.bind(this);
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

    refresh(x) {
        this.setState({loggedin: x});
    }

    logout() {
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
                    <Navigation userId={this.state.loggedUser.userId} username={this.state.loggedUser.username} onSelectNav={this.refresh} onSelectLogout={this.logout}/>
                    <HighScore hide={this.state.loggedin !== 0} user={this.state.loggedUser.user}/>
                    <Table hide={this.state.loggedin !== 3}/>
                    <GameRules hide={this.state.loggedin !== 4}/>
                </div>
            )
        } else {
            return (
                <div>
                    <Navigation userId={this.state.loggedUser.userId} username={this.state.loggedUser.username} onSelectNav={this.refresh} onSelectLogout={this.logout}/>
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