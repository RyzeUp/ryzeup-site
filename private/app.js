/**
 * Created by vcantu on 6/7/17.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function (app) {
    var connectionString = 'mongodb://localhost/ryze-up-dev'; // for local
    if(process.env.MONGODB_URI) { // check if running remotely
        connectionString = process.env.MONGODB_URI;
    }
    mongoose.connect(connectionString);

    require('./services/v1/congress.service.server.js')(app);
    require('./services/v1/civicinfo.service.server.js')(app);
    require('./services/v1/bills.service.server.js')(app);
    require('./services/v1/auth.service.server.js')(app);
};