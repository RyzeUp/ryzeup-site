/**
 * Created by vcantu on 6/14/17.
 */

var q = require('q');
const https = require('https');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

    app.post('/auth/v1/login', passport.authenticate('local'), login);
    app.post('/auth/v1/logout', logout);
    app.post('/auth/v1/register', register);
    app.get('/auth/v1/loggedin', loggedin);

    //TODO: google & facebook auth

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        // add to model;
        res.sendStatus(200);//todo update depending on model success
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : 401);
    }

    // ---- Set Strategies ---
    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        // TODO model
        // model.findObj({username: username})
        //     .then(function(user) {
        //             if (user.username === username &&
        //                 bcrypt.compareSync(password, user.password)) {
        //                 return done(null, user);
        //             }
        //             else {
        //                 return done(null, false);
        //             }
        //         },
        //         function(err) {
        //             if (err) { return done(err); }
        //         });
    }

    // ---- Serialize and Deserialize ---
    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }

    passport.deserializeUser(deserializeUser);
    function deserializeUser(user, done) {
        //todo model
        // model
        //     .findById(user._id)
        //     .then(
        //         function(user) {
        //             done(null, user);
        //         },
        //         function(err) {
        //             done(err, null);
        //         }
        //     );
    }
};