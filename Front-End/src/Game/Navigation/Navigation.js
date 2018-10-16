import React, { Component } from 'react';

class Navigation extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-2">
            { /* The navigation bar for the overall application, Buttons are hidden or displayed based upon whether or not a user is logged in */}
            {/* props utilised are the username: determines if user is logged in and supplies username, callback function to notify button selection */}
                <div className="div-inline">
                    <button className="btn btn-sm btn-outline-info mr-1" onClick={() => this.props.onSelectNav(0)}>Home</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.username !== null)} onClick={() => this.props.onSelectNav(1)}>Login</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.username !== null)} onClick={() => this.props.onSelectNav(2)}>Register</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.username === null)} onClick={() => this.props.onSelectNav(3)}>Play!</button>                            
                    <button className="btn btn-sm btn-outline-info mr-1" onClick={() => this.props.onSelectNav(4)}>Game Rules</button>
                    <button className="btn btn-sm btn-outline-danger" hidden={(this.props.username === null)} onClick={() => this.props.onSelectLogout()}>Log Out</button>
                </div>
                <a className="text-secondary text-outline-secondary mr-1" hidden={(this.props.username === null)}>Welcome {this.props.username}!</a>
            </nav>
        );
    }
}

export default Navigation;