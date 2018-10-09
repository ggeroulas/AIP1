import React, { Component } from 'react';
import Game from './Game/Game.js'
import Header from './Header/Header.js'
import './App.css';


//♠	♥	♦	♣

class App extends Component {
  
  render() {
    return (
      <div>
        <div className="backCol">
          <Header/>
          <Game/> {/* Initialises the main component */}
        </div>
          <nav className="navbar navbar-light bg-dark">
            <p className="text-light foot">Advanced Internet Peoplez | Dai Lo Dev Team </p>
            <a className="text-light foot" href="https://www.youtube.com/watch?v=q6EoRBvdVPQ">Copyright© 2018</a>
          </nav>
      </div>
    );
  }
}

export default App;
