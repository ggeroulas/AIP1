var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// 
var UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    score: {
        type: Number,
        required: true
    },
    games: [
        {
            result: [Boolean],
            dealer: [Number],
            player: [Number]
        }
    ]
  });

// Authentication function
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ name: name })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          return callback(null, user);
        } else {
          var err = new Error('Password Incorrect.');
          return callback(err, null);
        }
      })
    });
}

//hashes the password
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;