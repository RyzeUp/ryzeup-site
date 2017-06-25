/**
 * Created by vcantu on 6/20/17.
 */
const q = require('q');
const https = require('https');
const bcrypt = require('bcrypt-nodejs');

module.exports = function (app, model) {

    app.get   ('/api/v1/admin/users', usersReq);
    app.delete('/api/v1/admin/delete/:id', deleteReq);
    app.post  ('/api/v1/admin/update-role/:id', updateRoleReq);

    function usersReq(req, res) {
        if (req.isAuthenticated() && isAdmin(req.user)) {
            // allow request
            model.getUserPage(1)
                .then(function (users) {
                    res.json(users);
                }, function (e) {
                    res.sendStatus(404);
                });
        }
        else {
            res.sendStatus(401);
        }
    }

    function deleteReq(req, res) {
        if (req.isAuthenticated() && isAdmin(req.user)) {
            var userId = req.params['id'];
            // allow request
            model.removeUserById(userId)
                .then(function (user) {
                    cleanUser(user);
                    res.json(user);
                }, function (e) {
                    res.sendStatus(404);

                });
        }
        else {
            res.sendStatus(401);
        }
    }

    function updateRoleReq(req, res) {
        if (req.isAuthenticated() && isAdmin(req.user)) {
            // allow request
            var userId = req.params['id'];
            model.updateUserRole(userId, req.body.new)
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

    function isAdmin(user) {
        return user.role === 'admin';
    }
};