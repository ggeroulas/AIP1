'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');

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

// exports.list_all_game = function(req, res) {
//     User.find({games})
// }