import React, { Component } from 'react';
import logo from './shark.png';
import './App.css';
//♠	♥	♦	♣

class App extends Component {
  constructor() {
    super();
    this.state = { score: 0};

  }

  

  draw() {}
  
  stay() {}
  
  render() {
    const score = this.state.score;
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
        <div  className="Game">
          <div className="Score">
            <p>Score: {score}</p>
          </div>
          <div className="opponentCards">
            <div className="cardOpp">
              <p>6♣</p>
            </div>
            <div className="cardOpp">
              <p>A♣</p>
            </div>
          </div>
          <div className="playerCards">
            <div className="cardPlayer">
              <p>4♠</p>
            </div>
            <div className="cardPlayer">
              <p>10♠</p>
            </div>
            
          </div>
          <div className="Choice">
            <button className="button" onClick={this.draw}>DRAW</button>
            <button className="button" onClick={this.stay}>STAY</button>
          </div>
          <br/>
          <button id="nextGame">NEXT GAME</button>
        </div>
        
      </div>
    );
  }
}

export default App;
