/**
 * Created by vcantu on 6/20/17.
 */
const q = require('q');
const https = require('https');

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

    function cleanUser(user) {
        delete user.password;
        delete user.facebook;
        delete user.google;
    }
};