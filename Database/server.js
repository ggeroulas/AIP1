var express = require('express');
var app = express();
<<<<<<< HEAD
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var User = require('./user');

mongoose.connect('mongodb://localhost:27017/temp', { useNewUrlParser: true });

User.db.useDb("temp");
User.db.dropDatabase("temp");

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

//sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'doggo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

var tempUser = {
    username: "Johnny",
    password: "marcsuccs1",
    score: 1000
};
User.create(tempUser);

tempUser = {
    username: "Mark",
    password: "nootnoot",
    score: 1000
};
User.create(tempUser);

tempUser = {
    username: "Lisa",
    password: "whattanug",
    score: 1000
};
User.create(tempUser); 

app.post('/login', function(req, res, next) {
    if (req.query.username && req.query.password) {
        User.authenticate(req.query.username, req.query.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong name or password.');//without sessions
                err.status = 401; //without sessions
                return res.json([false, 'Wrong name or password.']);
            } else {
                req.session.id = User._id;
                return req.session.id;//json([true]);//without sessions
            }
        });
    } else {
        var err = new Error('Name and password are required.'); //without sessions
        err.status = 401; //without sessions
        return res.json([false, 'Name and password are required.']); //without sessions
    }
});

app.get('/users', (req, res) => {
    User
        .find()
        .then(results => res.json(results));
});

app.get('/find', (req, res) => {
    User
        .find({username: req.query.username})
        .then(results => res.json(results));
});


//temp
app.get('/test', (req, res) => {
    res.json('hello');
});


server = app.listen(5000, () => {
    console.log('Running on http://localhost:5000/');
=======
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
>>>>>>> db
});