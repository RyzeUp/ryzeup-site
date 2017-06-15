/**
 * Created by vcantu on 6/7/17.
 */

module.exports = function (app) {
    require('./services/congress.service.server.js')(app);
    require('./services/civicinfo.service.server.js')(app);
    require('./services/bills.service.server.js')(app);
};