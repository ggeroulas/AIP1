import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-2">
                <div className="div-inline">
                    <button className="btn btn-sm btn-outline-info mr-1" onClick={() => this.props.onSelectNav(0)}>Home</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.userId !== null)} onClick={() => this.props.onSelectNav(1)}>Login</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.userId !== null)} onClick={() => this.props.onSelectNav(2)}>Register</button>
                    <button className="btn btn-sm btn-outline-info mr-1" hidden={(this.props.userId === null)} onClick={() => this.props.onSelectNav(3)}>Play!</button>                            
                    <button className="btn btn-sm btn-outline-info mr-1" onClick={() => this.props.onSelectNav(4)}>Game Rules</button>
                    <button className="btn btn-sm btn-outline-danger" hidden={(this.props.userId === null)} onClick={() => this.props.onSelectLogout()}>Log Out</button>
                </div>
                <a className="text-secondary text-outline-secondary mr-1" hidden={(this.props.userId === null)}>Welcome {this.props.username}!</a>
            </nav>
        );
    }
}1

export default Navigation;