'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
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
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err)
            return next(err);
        user.password = hash;
        next();
    });
});

// Checks Credentials
UserSchema.methods.validatePassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


module.exports = mongoose.model('Users', UserSchema);