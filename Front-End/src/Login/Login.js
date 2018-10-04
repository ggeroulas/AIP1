import React, { Component } from 'react';
import axios from 'axios';
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
    };

    checkPassword(e) {
        axios.post('/login', 
            {
                username: this.username.value,
                password: this.password.value
            })
            .then(
                (res) => {
                    console.log(res.data.token);
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        this.props.onLogin();
                    }
                }
            )
            .catch((err) => {//should instead get the error response from the api
                this.setState({error: err.response.data.error.message});               
                document.getElementById("errorMsg").className = "alert alert-danger";
            }
            );
        e.preventDefault();
    }
    
    render() {
        
        
        return( 
        <div className="container-small center">
            <p className="alert alert-danger hide" id="errorMsg">{this.state.error}</p>
            <form onSubmit={this.checkPassword}>
                <h4>Login</h4>
                <div className="form-group">    
                    <label>Username</label>
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

