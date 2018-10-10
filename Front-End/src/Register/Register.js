import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: '' 
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(e) {
        if (this.password.value === this.cpassword.value) {
            axios.post('/register',
            {
                username: this.username.value,
                password: this.password.value
            })
            .then(
                (res) => {
                    this.props.onRegister();
                },
                (err) => {//should instead get message from error
                    this.setState({error: "Username already taken!"});                }
            )
        }
        else {
            this.setState({error: "Passwords do not match!"});
        }
        e.preventDefault();
    }


    render() {
        return(
            <div className="container-small center" hidden={this.props.hide}>
            <form onSubmit={this.registerUser}>
                <h4>Register</h4>
                <div className="form-group">    
                    <label>Username</label>
                    <input type="text" className="form-control" ref={input => this.username = input} placeholder="Username"></input>
                </div>    
                <div className="form-group">
                    <label>Password</label>
                    <input  type="password" className="form-control" ref={input => this.password = input} placeholder="Password"></input>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input  type="password" className="form-control" ref={input => this.cpassword = input} placeholder="Password"></input>
                </div>
                <p className="alert alert-danger" hidden={(this.state.error === '')}>{this.state.error}</p>
                <input className="btn btn-primary" type="submit" value="Sign Up"/>
            </form>
        </div>
        );
    }

}

export default Register;