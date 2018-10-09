// https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; // Used to extract JWT from user

// Passport Middleware for User registration
passport.use('register', new localStrategy({
    usernameField : 'username',
    passwordField : 'password'
}, async (username, password, done) => {
    try {
        const user = await UserModel.create({ username, password });
        return done(null, user);
    } catch (error) {
        error.status = 409;
        error.message = 'Username already exists!';
        done(error);
    }
}));

// Passport Middleware for User Login
passport.use('login', new localStrategy({
    usernameField : 'username',
    passwordField : 'password'
}, async (username, password, done) => {
    try {   
        const user = await UserModel.findOne({ username });
        if ( !user ) {
            return done(null, false, { message : 'Incorrect Username or Password!'});//FIX ERROR MESSAGES
        }
        const validate = await user.validatePassword(password);
        if ( !validate ) {
            return done(null, false, { message : 'Incorrect Username or Password!' });
        } else {
            return done(null, user, { message : 'Logged in Successfully'});
        }
    } catch (error) {
        error.status = 409;
        error.message = ('Username already exists!');
        done(error);
    }
}));

// Verification of tokens
passport.use(new JWTstrategy({
    secretOrKey : 'doggo',
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        // Pass user details to next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}))