'use strict';

var mongoose = require('mongoose');
var brypt = require('bcrypt');
var User = mongoose.model('Users');

const jwt = require("jsonwebtoken");

// const passport = require("passport");
// passport.use(jwtStrategy);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

exports.list_all_users = function(req,  res) {
    User.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_new_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.login = (req, res) => {
    let { username, password } = req.body;
    // temporary
    if (username === "Joy") {
        if (password === "pass") {
            const opts = {};
            opts.expiresIn = 6000; //temp
            const secret = "DOGGIES"
            const token = jwt.sign({ username }, secret, opts);
            return res.status(200).json({
                username,
                message: "Auth Passed",
                token
            })
        }
    }
    return res.status(401).json({ message: "Auth Failed" })
};
// exports.list_all_game = function(req, res) {
//     User.find({games})
// }