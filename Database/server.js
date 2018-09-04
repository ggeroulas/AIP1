const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });

const User = mongoose.model('User', {
    id: {type: Number, index: true},
    user: [String],
    password: [String],
    score: [Number],
    games: [
        {
            result: [Boolean],
            dealer: [Number],
            player: [Number]
        }
    ]
});

User
    .remove({}) 
    .then(() => {
        new User({
            user: 'Davy', 
            password: 'doggo1',
            score: 0,
            games: [
                {
                    result: true,
                    dealer: 14,
                    player: 17
                }
            ]
        }).save();

        new User({
            user: 'Lisa', 
            password: 'nootnoot',
            score: 0,
            games: [
                {
                    result: true,
                    dealer: 34,
                    player: 11
                }
            ]
        }).save();

        new User({
            user: 'Johnny', 
            password: 'marksuccs1',
            score: 0,
            games: [
                {
                    result: false,
                    dealer: 12,
                    player: 11
                }
            ]
        }).save();
        
    });

    new User({
        user: 'Mark', 
        password: 'whatastory',
        score: 0,
        games: [
            {
                result: false,
                dealer: 21,
                player: 19
            }
        ]
    }).save();

app.get('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

app.get('/find', (req, res) => {
    User
        .find({user: req.query.user})
        .then(results => res.json(results));
});


app.post('/add', (req, res) => {
    console.log("hi");
    User
        .insertMany({id: req.query.id, user: req.query.user, password: req.query.password, score: req.query.score})
        .then(results => res.json(results));
        
});

server = app.listen(3000, () => {
    console.log('Running on http://localhost:5000/');
});