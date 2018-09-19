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
            })
            .then(
                (res) => {
                    localStorage.setItem('token', res.data.token);
                    console.log('complete'); //should reroute to the table
                }, 
                (err) => {//should instead get the error response from the api
                    alert("Incorrect Username or Password!");   
                }
            );
        //     ).then(
        //         axios.get('/user/',
        //             {
        //                 headers: {
        //                     'Authorization': 'Bearer ' + localStorage.getItem('token') //localStorage.clearItem('token');
        //             }
        //         }).then((res) => {
        //             console.log(res);
                    
        //         }));
        e.preventDefault();
    }
    
    render() {
        // <div class="alert alert-warning" role="alert"></div>
        
        return( 
        <div class="container-small center">
            <form onSubmit={this.checkPassword}>
                <h4>Login</h4>
                <div class="form-group">    
                    <label for="username">Username</label>
                    <input type="text" class="form-control" ref={input => this.username = input} placeholder="Username"></input>
                </div>    
                <div class="form-group">
                    <label>Password</label>
                    <input  type="password" class="form-control" ref={input => this.password = input} placeholder="Password"></input>
                </div>
                <input class="btn btn-primary" type="submit" value="Login"/>
            </form>
        </div>
            
        );
    } 
}

export default Login;

