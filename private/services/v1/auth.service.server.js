/**
 * Created by vcantu on 6/14/17.
 */

const q = require('q');
const https = require('https');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const authConfig       = require('./helpers/auth.config.server');
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;


module.exports = function (app) {

    app.post('/auth/v1/login', passport.authenticate('local'), login);
    app.post('/auth/v1/logout', logout);
    app.post('/auth/v1/register', register);
    app.get ('/auth/v1/loggedin', loggedin);

    app.post('/auth/v1/facebook',       passport.authenticate('facebook', { scope : 'email'}));
    app.get ('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#!/profile',
            failureRedirect: '/assignment/index.html#!/login'
        }));

    //TODO: google & facebook auth

    function login(req, res) {
        var user = req.user;
        delete user.password;// delete password before sending
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        model.createUser(newUser)
            .then(function (response) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            })

    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : 401);
    }

    // ---- Set Strategies ---
    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        model.findByUsername({username: username})
            .then(function(user) {
                    if (user.username === username &&
                        bcrypt.compareSync(password, user.password)) {
                        delete user.password;// delete password before sending
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }

    passport.use(new FacebookStrategy(authConfig.facebook, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {
        model.findUserByFacebookId(profile.id)
            .then(function (res) {
                if (res) {
                    //authenticated
                    done(null, res);
                }
                else {
                    var names = profile.displayName.split(' ');
                    var newUser = {
                        firstName: names[0],
                        lastName: names[names.length - 1],
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    // model.createObj(newUser)
                    //     .then(function (response) {
                    //         done(null, response);
                    //     })
                }
            })
    }

    // ---- Serialize and Deserialize ---
    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }
};