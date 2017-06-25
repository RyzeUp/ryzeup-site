/**
 * Created by vcantu on 6/20/17.
 */
const q = require('q');
const https = require('https');
const bcrypt = require('bcrypt-nodejs');

module.exports = function (app, model) {

    app.get('/api/v1/user/:id', userReq);
    app.post('/api/v1/user/update/:id', updateReq);
    app.post('/api/v1/user/newpass/:id', newpassReq);
    app.get('/api/v1/user/unregister/:id', unregisterReq);

    app.get('/dev/v1/add/users', addDummyUsers)
    // Mock users
    var dummyUsers = [
        {
            firstName: 'Alice',
            lastName: 'Wonderland',
            email: 'alice@email.com',
            password: 'alice'
        },
        {
            firstName: 'Bob',
            lastName: 'Bo',
            email: 'bob@email.com',
            password: 'bob'
        },
        {
            firstName: 'Alex',
            lastName: 'Alex',
            email: 'alex@email.com',
            password: 'alex'
        },
        {
            firstName: 'Mary',
            lastName: 'Ellen',
            email: 'mary@email.com',
            password: 'mary'
        }
    ];

    function addDummyUsers(req, res) {
        for (var u in dummyUsers) {
            dummyUsers[u].password =  bcrypt.hashSync(dummyUsers[u].password);
            dummyUsers[u].picture = {
                is_unset: true,
                url: '/assets/images/profile-images/default-profile.png'
            };
            model.createUser(dummyUsers[u]);
        }
        res.sendStatus(200);
    }


    function userReq(req, res) {
        var userId = req.params['id'];
        if (req.isAuthenticated() && (req.user._id + '') === userId) {
            // allow request
            model.findUserById(userId)
                .then(function (user) {
                    cleanUser(user);
                    res.json(user);
                }, function (e) {
                    res.sendStatus(404);
                })
        }
        else {
            res.sendStatus(401);
        }
    }

    function updateReq(req, res) {
        var userId = req.params['id'];
        if (req.isAuthenticated() && (req.user._id + '') === userId) {
            // allow request
            model.updateUserById(userId, req.body)
                .then(function (user) {
                    cleanUser(user);
                    res.json(user);
                }, function (e) {
                    res.sendStatus(404);
                })
        }
        else {
            res.sendStatus(401);
        }
    }

    function newpassReq(req, res) {
        var userId = req.params['id'];
        if (req.isAuthenticated() && (req.user._id + '') === userId) {
            // allow request
            model.updateUserPassword(userId, bcrypt.hashSync(req.body.new))
                .then(function (user) {
                    res.sendStatus(200);
                }, function (e) {
                    res.sendStatus(404);
                })
        }
        else {
            res.sendStatus(401);
        }
    }

    function unregisterReq(req, res) {
        var userId = req.params['id'];
        if (req.isAuthenticated() && (req.user._id + '') === userId) {
            // allow request
            model.removeUserById(userId)
                .then(function (user) {
                    res.sendStatus(200);
                }, function (e) {
                    res.sendStatus(404);
                })
        }
        else {
            res.sendStatus(401);
        }
    }

    function cleanUser(user) {
        delete user.password;
        delete user.facebook;
        delete user.google;
    }
};