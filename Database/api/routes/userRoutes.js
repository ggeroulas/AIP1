'use strict';

module.exports = function(app) {
    var users = require('../controller/userController');

    //User Routes
    app.route('/users')
        .get(users.list_all_users)
        .post(users.create_new_user);

    // used later todo
    app.route('/users/login')
        .post(users.login);

    //possibly changing to separate game
    // app.route('/user/games/:username')
    //     .get(users.list_all_game)
    //     .post(user.add_new_game);
};
