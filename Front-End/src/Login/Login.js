import React, { Component } from 'react';
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
        
        
        return( 
        <div className="container-small center">
            <p class="alert alert-danger">
                This is a danger alert—check it out!
            </p>
            

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

