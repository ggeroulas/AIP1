const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const router = express.Router();

router.post('/register', passport.authenticate('register', { session : false }) , async (req, res, next) => {
    res.json({
        message : "Register Successful",
        user : req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error();
                error.status = 401;
                error.message = info.message;
                return next(error);
            }
            req.login(user, { session : false }, async (error) => {
                if ( error ) { return next(error); }
                // in the body of the token it will return userid and username
                const body = { _id : user._id, username : user.username };
                // Signs the JWT token and add the populated body
                const token = jwt.sign({ user : body }, 'doggo', { expiresIn: '2h' });
                // Sends token back to user
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })
    (req, res, next);
});

router.get('/highScore', (req, res) => {
    User.find({}, 'username score', { sort: {'score': -1} }, (err, users) => {
        if (err) return handleError(err);
        res.send(users);
    });
});

router.get('/test', (req, res) => {
    res.send('Connected');
});

module.exports = router;