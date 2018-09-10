'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 1000
    }
});

// Hashes the password
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});


module.exports = mongoose.model('Users', UserSchema);