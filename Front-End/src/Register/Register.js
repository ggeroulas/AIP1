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
            <div className="Register">
                <form onSubmit={this.registerUser}>
                    <input type="text" ref={input => this.username = input} placeholder="Username"/>
                    <input type="password" ref={input => this.password = input} placeholder="Password"/>
                    <input type="password" ref={input => this.cpassword = input} placeholder="Confirm Password"/>
                    <input type="submit" value="Register"/>
                </form>
                <p>{this.state.error}</p>
            </div>
        );
    }

}

export default Register;