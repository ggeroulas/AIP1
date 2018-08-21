import React, { Component } from 'react';
import "./App.css";

import Header from "./Header/Header.js";
import Game from "./Game.js";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="flexMainContainer">
                    <div className="flexGameItem">
                        <Game/>
                    </div>
                    <div className="flexFootItem">

                    </div>
                </div>


            </div>
        )
    }
}

export default App;