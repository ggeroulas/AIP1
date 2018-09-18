const express = require('express');
const router = express.Router();
const User = require('../models/userModel')

router.get('/', (req, res, next) => {
    res.json({
        message : 'You made it to the secure route',
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

// router.post('/scoreUpdate', (req, res) => {
//     try {
//         const score = req.body.score;
//         //console.log(User.score);
//         User.updateOne({'username': req.user.username}, {'score': score })
//         //console.log('test');
//         res.json(post);
//     } catch (error) {
//         console.log('test2');
//         done(error);
//     }
// });

module.exports = router;