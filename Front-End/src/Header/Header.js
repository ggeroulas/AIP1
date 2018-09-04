import React, { Component } from 'react';
import './Header.css';
import logo from '../shark.png';
import Login from './Login.js';

class Header extends Component {

    render() {
        return( // Renders the header of the page
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Card Shark</h1>
            </header>
            <Login/>            
        </div>
        );
    }
}

export default Header;

