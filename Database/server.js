var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('./user');
mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });

User.db.useDb("temp");
User.db.dropDatabase("temp");

var tempUser = {
    name: "Johnny",
    password: "marcsuccs1",
    score: 1000
};
User.create(tempUser);

tempUser = {
    name: "Mark",
    password: "nootnoot",
    score: 1000
};
User.create(tempUser);

tempUser = {
    name: "Lisa",
    password: "whattanug",
    score: 1000
};
User.create(tempUser); 

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


server = app.listen(5000, () => {
    console.log('Running on http://localhost:5000/');
});