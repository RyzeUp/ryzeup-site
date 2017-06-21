/**
 * Created by vcantu on 6/20/17.
 */

// returns null if validation fails
// returns validated user
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function (user) {
    user = validateCanAuthenticate(user);
    user = validateUsername(user);
    user = validateEmail(user);
    user = validateFacebook(user);
    return user;
};

// can be authenticated (locally, facebook or google)
function validateCanAuthenticate(user) {
    var local = user.hasOwnProperty('username') &&
                user.hasOwnProperty('username_lower') &&
                user.hasOwnProperty('password');
    var facebook = user.hasOwnProperty('facebook') &&
                user.facebook.hasOwnProperty('id') &&
                user.facebook.hasOwnProperty('token');
    var google = user.hasOwnProperty('google') &&
        user.google.hasOwnProperty('id') &&
        user.google.hasOwnProperty('token');

    if (local || facebook || google)
        return user;
    return null;
}

// if there is a username it adds a lowercase username
function validateUsername(user) {
    if (!user.username)
        return user;
    user.username_lower = user.username.toLowerCase();
    return user;
}

// must have email and it must be valid
function validateEmail(user) {
    // TODO: google or facebook may not have an email
    if (!user.email)
        return null;
    if (!emailRegex.test(user.email))
        return null;
    user.email.toLowerCase();
    return user;
}

// makes sure all of the facebook fields are present
function validateFacebook(user) {
    if (!user.facebook)
        return user;
    if (!user.facebook.id || !user.facebook.token || !user.facebook.picture)
        return null;
    return user;
}