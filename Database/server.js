var express = require('express');
var app = express();
var mongoose = require('mongoose');
var body = require('body-parser');
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

router.post('/', function(req, res, next) {
    if (req.body.name && req.body.password) {
      User.authenticate(req.body.name, req.body.password, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong name or password.');
          err.status = 401;
          return next(err, null);
        }  else {
          req.session.userId = user._id;
          return next(null, user._id);
        }
      });
    } else {
      var err = new Error('Name and password are required.');
      err.status = 401;
      return next(err, null);
    }
  });

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