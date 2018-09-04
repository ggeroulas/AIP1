import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: '',
            error: ''
        }
        this.checkPassword = this.checkPassword.bind(this);
    }

    checkPassword(e) {
        if (this.username.value === "Zhongy97" && this.password.value === "Password") {//temporary
            this.setState({
                loggedIn: true,
                user: 'Zhongy97',
                error: ''
            });

        } else {
            this.setState({error: 'Username or Password Incorrect'});
        }
        e.preventDefault();
    }
    
    render() {
        return( 
            <div className="login"> {/* The login bar accross the top of the page*/}
                <form onSubmit={this.checkPassword}>
                    <input type="text" ref={input => this.username = input} placeholder="Username"></input>
                    <input  type="password" ref={input => this.password = input} placeholder="Password"></input>
                    <input type="submit"/>
                </form>
                <p>{this.state.error}</p>
                <button>Sign Up</button>
            </div>
        );
    }
}

export default Login;

