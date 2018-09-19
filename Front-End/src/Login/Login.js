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
                //this.setState(); Need to set the error to show up in login
                this.setState({error: res.data.error});
                localStorage.setItem('token', res.data.token);
            }).then(
                axios.get('/user/profile',
                    {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token') //localStorage.clearItem('token');
                    }
                }).then((res) => {
                    console.log(res);
                    
                }));
        // if (this.username.value === "Zhongy97" && this.password.value === "Password") {//temporary
        //     this.setState({
        //         loggedIn: true,
        //         user: 'Zhongy97',
        //         error: ''
        //     });

        // } else {
        //     this.setState({error: 'Username or Password Incorrect'});
        // }
        // fetch("/test")
        //     .then(res => res.json())
        //     .then(data => console.log(data));
        e.preventDefault();
    }
    
    render() {
        // <div className="alert alert-warning" role="alert"></div>
        
        return( 
        <div className="container-small center">
            <form onSubmit={this.checkPassword}>
                <h4>Login</h4>
                <div className="form-group">    
                    <label for="username">Username</label>
                    <input type="text" className="form-control" ref={input => this.username = input} placeholder="Username"></input>
                </div>    
                <div className="form-group">
                    <label>Password</label>
                    <input  type="password" className="form-control" ref={input => this.password = input} placeholder="Password"></input>
                </div>
                <input className="btn btn-primary" type="submit" value="Login"/>
            </form>
        </div>
            
        );
    } 
}

export default Login;

