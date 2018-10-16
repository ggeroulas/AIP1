import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return( // Renders the footer of the page
            <nav className="navbar navbar-light bg-dark">
                <a className="text-light foot" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Advanced Internet Peoplez | Dai Lo Dev Team</a>
                <a className="text-light foot" href="https://www.youtube.com/watch?v=q6EoRBvdVPQ">Copyright© 2018</a>
            </nav>
        );
    }
}

export default Footer;

