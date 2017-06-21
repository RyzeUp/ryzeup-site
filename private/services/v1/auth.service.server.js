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

module.exports = function (app, model) {

    app.post('/auth/v1/login', passport.authenticate('local'), login);
    app.post('/auth/v1/logout', logout);
    app.post('/auth/v1/register', register);
    app.get ('/auth/v1/loggedin', loggedin);

    app.get ('/auth/v1/facebook',          passport.authenticate('facebook', { scope : ['email', 'user_friends'] }));
    app.get ('/auth/v1/facebook/callback', passport.authenticate('facebook',
        {
            successRedirect: '/#!',
            failureRedirect: '/#!/login'
        }));

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
        if (!newUser.picture) {
            // TODO: random image url
            newUser.picture = {
                is_unset: true,
                //url: getRandomProfileImageUrl();
            }
        }
        model.createUser(newUser)
            .then(function (response) {
                res.sendStatus(200);
            }, function (e) {
                console.log(e);
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
                    return registerWithFacebook(profile, token);
                }
            })
            .then(function (response) {
                done(null, response);
            }, function (error) {
                console.log(error);
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



    // ---- Register Logic ----
    function registerLocally(user) {
        var deferred = q.defer();

        if (!newUser.picture) {
            user.picture = {
                is_unset: true,
                url: null,
                // TODO
                //url: getRandomProfileImageUrl();
            };
        }
        return deferred.promise;
    }

    function registerWithFacebook(profile, token) {
        var deferred = q.defer();
        model.findByEmail(profile.emails[0].value)
            .then(function (user) {
                // user exists
                if (user) {
                    console.log('found user updating');
                    // add facebook attributes to existing user
                    user.facebook = {
                        id:     profile.id,
                        token:  token,
                        picture: profile._json.picture.data
                    };
                    user = updateFBPicture(user);
                    return model.updateUserById(user._id, user);
                }
                else {
                    // create new facebook user
                    var newUser = {
                        firstName:  profile.name.givenName,
                        middleName: profile.name.middleName,
                        lastName:   profile.name.familyName,
                        gender:     profile.gender,
                        email:      profile.emails[0].value,

                        facebook: {
                            id:     profile.id,
                            token:  token,
                            picture: profile._json.picture.data
                        }
                    };
                    newUser = updateFBPicture(newUser);
                    return model.createUser(newUser);
                }
            })
            .then(function (user) {
                deferred.resolve(user);
            }, function (e) {
                deferred.reject({error: e});
            });

        return deferred.promise;
    }

    // updates picture to facebook picture if they don't have one set
    function updateFBPicture(user) {
        // if user has image
        if (!user.facebook.picture.is_silhouette) {//if user has fb image
            user.picture = {
                is_unset: false,
                url: user.facebook.picture.url
            }
        }
        else {
            user.picture = {
                is_unset: true,
                url: null
                // TODO
                //url: getRandomProfileImageUrl();
            };
        }
        return user;
    }

    function registerWithGoogle(profile, token) {
        var deferred = q.defer();


        return deferred.promise;
    }
};