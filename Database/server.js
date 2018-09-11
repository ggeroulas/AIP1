var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./api/models/userModel');
var passport = require('passport');

var routes = require('./api/routes/routes'); // importing route
var secureRoutes = require('./api/routes/secure-routes')



var PORT = process.env.PORT || 5000;

// Mongoose instance connection url 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cardshark');

require('./api/auth/auth');

app.use(bodyParser.urlencoded({ extended: false })); //check
app.use(bodyParser.json());

//testing only
User.db.dropDatabase("cardshark");

var tempUser = {
    username: "Johnny",
    password: "marcsuccs1"
};
User.create(tempUser);

//testing space ends

//register the route
app.use('/', routes); 
app.use('/user', passport.authenticate('jwt', { session : false}), secureRoutes );

// Handles errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
})

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found'})
});

server = app.listen(PORT, () => {
    console.log('Running on http://localhost:' + PORT + '/');
});