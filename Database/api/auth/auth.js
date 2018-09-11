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
        console.log('hello');
        const user = await UserModel.create({ username, password });
        return done(null, user);
    } catch (error) {
        console.log("Tony2");

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
            return done(null, false, { message : 'User not found'});
        }
        const validate = await user.validatePassword(password);
        if ( !validate ) {
            return done(null, false, { message : 'Wrong Password' });
        }
        return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
}));

// Verification of tokens
passport.use(new JWTstrategy({
    secretOrKey : 'doggo', //check
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        console.log('test-auth');
        // Pass user details to next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}))