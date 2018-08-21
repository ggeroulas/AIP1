import React, { Component } from 'react';
import "./Header.css"

import Login from "./Login.js";

class Header extends Component {
    render () {
        return (
            <div className="Header">
                <div className="flexContainer">
                    <div className="flexItem">
                        <h1>Welcome to CardShark!</h1>
                    </div>
                    <div className="flexItem">
                        <Login></Login>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;