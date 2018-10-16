import React, { Component } from 'react';
import axios from 'axios';
import './HighScore.css';

class HighScore extends Component {
    constructor() {
        super();
        this.testConnection();
        this.state = {
            users: []
        }
        this.getHighScores();
    }

    testConnection() {
        axios
            .get('/test') //this checks connection 
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err); //SERVER NOT CONNECTED ERROR
            });
    }

    getHighScores() {
        axios
            .get('/highScore') //gets list of highscore
            .then((res) => {
                // Creates an array of users by looping through data
                let users = [];
                for (let i = 0; i < res.data.length; i++) {
                    let user = { username: res.data[i].username, score: res.data[i].score };
                    users.push(user);
                }
                // Sets the list of users for the high scores
                this.setState({ users }); 
            });
    }

    render() {
        return (
            <div className="container-fluid center pt-3 highscore" hidden={this.props.hide}>
                <h6 hidden={this.props.user} className="text-primary center">Login or Register to play!</h6>
                <div className="form-inline center pt-2">
                {/* Header for high scores table */}
                    <h2 className="title">High Scores</h2>
                    <img className="trophy" src="./images/trophy.png" alt="trophy" />
                </div>
                <table className="table-small center">
                {/* Table shows high scores with rank, username and the score -> maximum 10 high scores */}
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>  
            </div>
        );
    }

}

export default HighScore;