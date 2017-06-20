/**
 * Created by vcantu on 6/20/17.
 */

module.exports = {
    facebook : {
        clientID      : process.env.FACEBOOK_CLIENT_ID,
        clientSecret  : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL   : process.env.FACEBOOK_CALLBACK_URL
    },
    google : {
        clientID      : process.env.GOOGLE_CLIENT_ID,
        clientSecret  : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL   : process.env.GOOGLE_CALLBACK_URL
    }
}