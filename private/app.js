<<<<<<< HEAD
/**
 * Created by vcantu on 6/7/17.
 */

module.exports = function (app) {
    require('./services/congress.service.server.js')(app);
    require('./services/civicinfo.service.server.js')(app);
    require('./services/bills.service.server.js')(app);
=======
/**
 * Created by vcantu on 6/7/17.
 */

module.exports = function (app) {
    require('./services/v1/congress.service.server.js')(app);
    require('./services/v1/civicinfo.service.server.js')(app);
    require('./services/v1/bills.service.server.js')(app);
    require('./services/v1/auth.service.server.js')(app);
>>>>>>> f132fa20b88e1bd8d50beeb82ff610251aa74cac
};