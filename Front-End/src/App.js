import React, { Component } from 'react';
import Game from './Game/Game.js'
import Header from './Header/Header.js'
import './App.css';
import Footer from './Footer/Footer.js'

class App extends Component {
  
    render() {
        return (
            <div className="backCol">
                {/* Renders the three main components of Header, Game and Footer */}
                <Header/>
                <Game/>  
                <Footer/>
            </div>
        );
    }
}

export default App;
