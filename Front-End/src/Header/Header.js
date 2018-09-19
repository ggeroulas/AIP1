import React, { Component } from 'react';
import './Header.css';

class Header extends Component {



    render() {
        return( // Renders the header of the page
        <div class="container-fluid">
            <div class="row header">
                    <h1 class="col">Welcome to Card Shark</h1>
                    <img class="col" src="./images/shark.png" className="App-logo" alt="logo" />
            </div>
        </div>
        );
    }
}

export default Header;

