const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });

const User = mongoose.model('User', {
    id: {type: Number, index: true},
    name: [String],
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
            id: 4592, 
            name: 'David', 
            password: 'doggo1',
            score: 1000,
            games: [
                {
                    result: true,
                    dealer: 14,
                    player: 17
                }
            ]
        }).save();

        new User({
            id: 5284, 
            name: 'Lisa', 
            password: 'nootnoot',
            score: 1000,
            games: [
                {
                    result: true,
                    dealer: 34,
                    player: 11
                }
            ]
        }).save();

        new User({
            id: 3729, 
            name: 'Johnny', 
            password: 'marksuccs1',
            score: 1000,
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
        id: 2999, 
        name: 'Mark', 
        password: 'whatastory',
        score: 1000,
        games: [
            {
                result: false,
                dealer: 21,
                player: 19
            }
        ]
    }).save();

app.use('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

app.use('/find', (req, res) => {
    User
        .find({name: req.query.name})
        .then(results => res.json(results));
});

app.use('/add', (req, res) => {
    console.log("hi");
    User
        .insertMany({id: req.query.id, name: req.query.name, password: req.query.password, score: req.query.score})
        .then(results => res.json(results));
        
});

server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});