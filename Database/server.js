const express = require('express');
const app = express();
const config = require('./config');

const mongoose = require('mongoose');
const user = config.database.username;
const password = config.database.password;
const mongoDB = 'mongodb://' + user + ':' + password + '@ds121373.mlab.com:21373/cardshark';
const bodyParser = require('body-parser');
const User = require('./api/models/userModel');
const passport = require('passport');

const routes = require('./api/routes/routes'); // importing route
const secureRoutes = require('./api/routes/secure-routes')



const PORT = process.env.PORT || 5000;

// Mongoose instance connection url 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

require('./api/auth/auth');

app.use(bodyParser.urlencoded({ extended: false })); //check
app.use(bodyParser.json());

//testing only
// User.db.dropDatabase("cardshark");

// const tempUser = {
//     username: "Joy",
//     password: "LIGMA"
// };
// User.create(tempUser);
//testing space ends

//register the route
app.use('/', routes); 
app.use('/user', passport.authenticate('jwt', { session : false}), secureRoutes );

//Handles errors
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