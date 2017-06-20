/**
 * Created by vcantu on 6/20/17.
 */

// returns null if validation fails
// returns validated user
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function (user) {
    user = validateUsername(user);
    user = validateEmail(user);
    return user;
};

function validateUsername(user) {
    if (!user.username)
        return null;
    user.username_lower = user.username.toLowerCase();
    return user;
}

function validateEmail(user) {
    if (!user.email)
        return null;
    if (!emailRegex.text(user.email))
        return null;
    user.email.toLowerCase();
    return user;
}