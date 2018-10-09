import React, { Component } from 'react';
import axios from 'axios';
import './HighScore.css';

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
            <div className="container-small center pt-3 bg-white highscore">
                <h6 className="text-primary">Login or Register to play!</h6>
                
                <div className="form-inline pt-2">
                    <h2>High Scores</h2>
                    <img className="trophy" src="./images/trophy.png" alt="trophy"/>
                </div>
                <table className="table center m-0 p-0">
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
                            <th scope="row">{index+1}</th>
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