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

    app.get ('/auth/v1/google',          passport.authenticate('google', { scope : ['email'] }));
    app.get ('/auth/v1/google/callback', passport.authenticate('google',
        {
            successRedirect: '/#!',
            failureRedirect: '/#!/login'
        }));

    function login(req, res) {
        var user = req.user;
        console.log('user logged in');
        delete user.password;// delete password before sending
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        registerLocally(newUser)
            .then(function (response) {
                res.sendStatus(200);
            }, function (e) {
                res.sendStatus(404);
            })
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : 401);
    }

    // ---- Set Strategies ---
    passport.use(new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        console.log('logging in ', username, password);
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

    passport.use(new GoogleStrategy(authConfig.google, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        model.findUserByGoogleId(profile.id)
            .then(function (res) {
                if (res) {
                    //authenticated
                    done(null, res);
                }
                else {
                    return registerWithGoogle(profile, token);
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
        user.password = bcrypt.hashSync(user.password);
        if (!user.picture) {
            // TODO: random image url
            user.picture = {
                is_unset: true,
                //url: getRandomProfileImageUrl();
            }
        }
        return model.createUser(user);
    }

    function registerWithFacebook(profile, token) {
        var deferred = q.defer();
        model.findByEmail(profile.emails[0].value)
            .then(function (user) {
                // user exists
                if (user) {
                    console.log('found user from facebook updating');
                    // add facebook attributes to existing user
                    user.facebook = {
                        id:     profile.id,
                        token:  token,
                        picture: profile._json.picture.data
                    };
                    user = updateFacebookPicture(user);
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

                        picture: {
                            is_unset: true
                        },

                        facebook: {
                            id:     profile.id,
                            token:  token,
                            picture: profile._json.picture.data
                        }
                    };
                    newUser = updateFacebookPicture(newUser);
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
    function updateFacebookPicture(user) {
        // if user has image
        console.log(user.picture.is_unset);
        console.log(!user.facebook.picture.is_silhouette);
        if (user.picture.is_unset && !user.facebook.picture.is_silhouette) {//if user has fb image
            console.log('setting new fb image');
            user.picture = {
                is_unset: false,
                url: user.facebook.picture.url
            }
        }
        return user;
    }

    function registerWithGoogle(profile, token) {
        var deferred = q.defer();
        model.findByEmail(profile.emails[0].value)
            .then(function (user) {
                // user exists
                if (user) {
                    console.log('found user from google updating');
                    // add facebook attributes to existing user
                    user.google = {
                        id:     profile.id,
                        token:  token,
                        picture: profile._json.image
                    };
                    user = updateGooglePicture(user);
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

                        picture: {
                            is_unset: true
                        },

                        google: {
                            id:     profile.id,
                            token:  token,
                            picture: profile._json.image
                        }
                    };
                    newUser = updateGooglePicture(newUser);
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
    function updateGooglePicture(user) {
        // if user has image
        if (user.picture.is_unset && !user.google.picture.isDefault) {//if user has google image
            user.picture = {
                is_unset: false,
                url: user.google.picture.url
            }
        }
        return user;
    }
};