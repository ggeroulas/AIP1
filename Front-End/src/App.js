import React, { Component } from 'react';
import Game from './Game/Game.js'
import Header from './Header/Header.js'
import './App.css';
import Footer from './Footer/Footer.js'

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="backCol">
            <Header/> {/* Initialises the header */}
            <Game/> {/* Initialises the main component */}
        </div>
            <Footer/> {/* Initialises the footer */}
      </div>
    );
  }
}

export default App;
