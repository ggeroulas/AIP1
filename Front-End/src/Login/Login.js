import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';

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
        axios.post('/login', 
            {
                username: this.username.value,
                password: this.password.value
            }).then((res) => {
                console.log(res);
                localStorage.setItem('token', res.data.token);
            }).then( //grabs username
                axios.get('/user/profile',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token') //localStorage.clearItem('token');
                    }
                }).then((res) => {
                    console.log(res);
                }));
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
            </div>
        );
    }
}

export default Login;

