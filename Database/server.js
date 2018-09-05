var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var body = require('body-parser'); Do we need this?
var User = require('./user');
mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });


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
        .insertMany({name: req.query.name, password: req.query.password, score: req.query.score})
        .then(results => res.json(results));
        
});

server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});