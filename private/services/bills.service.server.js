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

};