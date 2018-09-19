import React, { Component } from 'react';
import './Header.css';
import Login from '../Login/Login.js';
import Register from "../Register/Register.js"

class Header extends Component {



    render() {
        return( // Renders the header of the page
        <div class="container-fluid">
            <div class="jumbotron bg-1 row">
                    <h1 class="col-sm">Welcome to Card Shark</h1>
                    <img class="col-sm" src="./images/shark.png" className="App-logo" alt="logo" />
            </div>
        </div>
        );
    }
}

export default Header;

