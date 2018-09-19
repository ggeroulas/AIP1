import React, { Component } from 'react';
//import './App.css';
import Game from './Game/Game.js'
import Header from './Header/Header.js'

//♠	♥	♦	♣

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/>
        <Game/> {/* Initialises the main component */}
      </div>
    );
  }
}

export default App;
