import React, { Component } from 'react';
import axios from 'axios';

class HighScore extends Component {
    constructor() {
        super();
        axios.get('/test') //this checks connection 
            .then((res) => {
                console.log(res.data);    
            })
            .catch((err) => {
                console.log(err); //SERVER NOT CONNECTED ERROR
            });
        this.state = {
            users: []
        }
        this.getHighScores();
    }

    getHighScores() {
        axios
            .get('/highScore') //gets list of highscore
            .then((res) => {
                let users = [];
                for (let i = 0; i < res.data.length; i++) {
                    let user = {username: res.data[i].username, score: res.data[i].score};
                    users.push(user);
                }
                this.setState({users});
        });
    }

    render() {
        console.log(this.state.users)
        return(
            <div>
                <p>Test</p>
                {this.state.users.map((user, index) => {
                    return (
                        <div key={index}>
                            {user.username} - {user.score}
                        </div>
                    )
                })}
            </div>
        );
    }

}

export default HighScore;