import React, { Component } from 'react';
import logo from './shark.png';
import './App.css';
import Game from './game'

//♠	♥	♦	♣

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="login">
          <input type="text" placeholder="Username"></input>
          <input type="password" placeholder="Password"></input>
          <button>Login</button>
          <button>Sign Up</button>
          
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Card Shark</h1>
        </header>
        <Game/>
        
      </div>
    );
  }
}

export default App;
