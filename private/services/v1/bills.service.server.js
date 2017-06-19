<<<<<<< HEAD:private/services/bills.service.server.js
/**
 * Created by vcantu on 6/14/17.
 */

var q = require('q');
const https = require('https');
var levenshtein = require('fast-levenshtein');
const querystring = require('querystring');

var proPublicaKey = process.env.PRO_PUBLICA_KEY;

module.exports = function (app) {

    // app.get('/api/bills/recent', recentReq);
    // app.get('/api/congress/house', houseReq);

=======
/**
 * Created by vcantu on 6/14/17.
 */

var q = require('q');
const https = require('https');
var levenshtein = require('fast-levenshtein');
const querystring = require('querystring');

module.exports = function (app) {

    // app.get('/api/bills/recent', recentReq);
    // app.get('/api/congress/house', houseReq);

>>>>>>> f132fa20b88e1bd8d50beeb82ff610251aa74cac:private/services/v1/bills.service.server.js
};