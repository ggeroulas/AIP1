import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: '' //todo: should be sent to the header component to display
        }
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(e) {
        if (this.password.value === this.cpassword.value) {
            this.setState({error: '' });
            console.log("pass")
        }
        else {
            this.setState({error: 'Passwords do not match!' });
        }
        e.preventDefault();
    }


    render() {
        return(
            <div className="container-small center">
            <form onSubmit={this.registerUser}>
                <h4>Register</h4>
                <div className="form-group">    
                    <label for="username">Username</label>
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
                <input className="btn btn-primary" type="submit" value="Sign Up"/>
                <p>{this.state.error}</p>
            </form>
        </div>
        );
    }

}

export default Register;