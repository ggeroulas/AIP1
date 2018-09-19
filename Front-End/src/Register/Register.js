import React, { Component } from 'react';
import axios from 'axios';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: '' //todo: should be sent to the header component to display ##may not be needed if using alerts
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
                    console.log(res.data.message);
                },
                (err) => {//should instead get message from error
                    alert("Username already Taken")
                }
            )
        }
        else {
            alert("Passwords do not match!")
            
        }
        e.preventDefault();
    }


    render() {
        return(
            <div className="container-small center">
            <div className="alert alert-danger" name="alert">
                This is a danger alert—check it out!
            </div>
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
                <input className="btn btn-primary" type="submit" value="Sign Up"/>
                <p>{this.state.error}</p>
            </form>
        </div>
        );
    }

}

export default Register;