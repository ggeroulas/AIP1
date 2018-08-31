import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

    render() { 
        return( 
            <div className="login"> {/* The login bar accross the top of the page*/}
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button>Login</button>
                <button>Sign Up</button>
          
            </div>
        );
    }
}

export default Login;

