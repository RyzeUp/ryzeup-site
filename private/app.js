/**
 * Created by vcantu on 6/7/17.
 */

module.exports = function (app) {
    require('./services/congress.service.server.js')(app);
};