var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var body = require('body-parser'); Do we need this?
var User = require('./user');
mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });

<<<<<<< HEAD
=======
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
>>>>>>> b263765889e834bad3086e171e14f2582463f2fa

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
<<<<<<< HEAD
        .insertMany({name: req.query.name, password: req.query.password, score: req.query.score})
=======
        .insertMany({id: req.query.id, user: req.query.user, password: req.query.password, score: req.query.score})
>>>>>>> b263765889e834bad3086e171e14f2582463f2fa
        .then(results => res.json(results));
        
});

server = app.listen(3000, () => {
    console.log('Running on http://localhost:5000/');
});