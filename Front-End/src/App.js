import React, { Component } from 'react';
import Game from './Game/Game.js'
import Header from './Header/Header.js'
import './App.css';


//♠	♥	♦	♣

class App extends Component {
  
  render() {
    return (
      <div className="backCol">
        <Header/>
        <Game/> {/* Initialises the main component */}
      </div>
    );
  }
}

export default App;
