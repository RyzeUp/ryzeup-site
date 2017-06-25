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
        console.log('updating...')
        var userId = req.params['id'];
        if (req.isAuthenticated() && (req.user._id + '') === userId) {
            // allow request
            console.log('authenticated user: ', req.body);
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