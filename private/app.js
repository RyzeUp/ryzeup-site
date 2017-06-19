/**
 * Created by vcantu on 6/7/17.
 */

module.exports = function (app) {
    require('./services/v1/congress.service.server.js')(app);
    require('./services/v1/civicinfo.service.server.js')(app);
    require('./services/v1/bills.service.server.js')(app);
    require('./services/v1/auth.service.server.js')(app);
};