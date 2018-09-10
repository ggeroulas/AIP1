var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./api/models/userModel');
var routes = require('./api/routes/userRoutes'); // importing route

var PORT = process.env.PORT || 5000;

// Mongoose instance connection url 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cardshark');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//testing only
User.db.dropDatabase("cardshark");

var tempUser = {
    username: "Johnny",
    password: "marcsuccs1"
};
User.create(tempUser);

//testing space ends

routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found'})
});

server = app.listen(PORT, () => {
    console.log('Running on http://localhost:' + PORT + '/');
});