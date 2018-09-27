import React, { Component } from 'react';
import Game from './Game/Game.js'
import Header from './Header/Header.js'

//♠	♥	♦	♣

class App extends Component {
  
  render() {
    return (
      <div className="container-fluid backG">
        <Header/>
        <Game/> {/* Initialises the main component */}
      </div>
    );
  }
}

export default App;
