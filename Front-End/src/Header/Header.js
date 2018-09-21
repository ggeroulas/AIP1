import React, { Component } from 'react';
import './Header.css';

class Header extends Component {



    render() {
        return( // Renders the header of the page
        <div className="container-fluid">
            <div className="row header">
                    <h1 className="col">Welcome to Card Shark</h1>
                    <img className="col" src="./images/shark.png" className="App-logo" alt="logo" />
            </div>
        </div>
        );
    }
}

export default Header;

