// Secure-routes handles the API requests that are onlu allowed for those with an authorised token
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// retrieved the user _id and their username
router.get('/', (req, res, next) => {
    res.json({
        user : req.user,
        token: req.query.secret_token
    });
});

// retrieved the users score from the database
router.get('/userScore', (req, res) => {
    User.findOne({ 'username': req.user.username}, 'score', function (err, User) {
        if (err) return handleError(err);
        res.json({
            message : 'This should be the score',
            score: User.score
        });
    });  
});


// updates the users score based on the input as a win (1) or a loss (0)
// the score is retrieved from the db and 100 is added or taken away and db is updated.
router.post('/scoreUpdate', (req, res) => {
    User.findOne({ username: req.user.username}, 'score', function (err, userCurrent) {
        if (err) return handleError(err);

        const score = userCurrent.score;
        const change = (parseInt(req.body.win) === 1) ? 100 : -100;
        const conditions = { username: req.user.username },
            update = { score: score + change},
            options = { multi: false };
            
        User.findOneAndUpdate(conditions, update, options, function(err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("Score Updated!");
        });  
    });
});

module.exports = router;