const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', passport.authenticate('register', { session : false }) , async (req, res, next) => {
    console.log("Tony");
    res.json({
        message : "Register Successful",
        user : req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured');
                return next(error);
            }
            req.login(user, { session : false }, async (error) => {
                if ( error ) { return next(error); }
                // in the body of the token it will return userid and username
                const body = { _id : user._id, username : user.username };
                // Signs the JWT token and add the populated body
                const token = jwt.sign({ user : body }, 'doggo'); //check
                // Sends token back to user
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })
    (req, res, next);
});

module.exports = router;