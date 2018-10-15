const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./api/routes/routes');
const secureRoutes = require('./api/routes/secure-routes');
const app = express();

const PORT = process.env.PORT || 5000;

// Mongoose instance connection url 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cardshark');

require('./api/auth/auth');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//registers and utilises the routes
app.use('/', routes); 
app.use('/user', passport.authenticate('jwt', { session : false}), secureRoutes );

//Handles all errors, if status not specified by catch default is 500.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error : err });
})

// If bad requests for server come in they are redirected to a page not found.
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found'});
});

// Opens port
server = app.listen(PORT, () => {
    console.log('Running on http://localhost:' + PORT + '/');
});