import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    
    render() {
        return( // Renders the header of the page
            <div className="container-fluid">
                <div className="row header">
                    <h1 className="col head">Card Shark</h1>
                    <img className="App-logo m-2" src="./images/shark.png" alt="logo" />
                </div>
            </div>
        );
    }
}

export default Header;