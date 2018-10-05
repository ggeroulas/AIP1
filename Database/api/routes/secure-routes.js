const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.get('/', (req, res, next) => {
    res.json({
        user : req.user,
        token: req.query.secret_token
    })
});

router.get('/userScore', (req, res) => {
    User.findOne({ 'username': req.user.username}, 'score', function (err, User) {
        if (err) return handleError(err);
        res.json({
            message : 'This should be the score',
            score: User.score
        })
    });  
});

router.post('/scoreUpdate', (req, res) => {
    User.findOne({ username: req.user.username}, 'score', function (err, userCurrent) {
        if (err) return handleError(err);

        let score = userCurrent.score;
        let change = (parseInt(req.body.win) === 1) ? 100 : -100;
        var conditions = { username: req.user.username },
            update = { score: score + change},
            options = { multi: false };
        User.findOneAndUpdate(conditions, update, options, function(err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("Score Updated!");
        });  
    });
});
module.exports = router;