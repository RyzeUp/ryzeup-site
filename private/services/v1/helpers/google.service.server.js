/**
 * Created by vcantu on 6/14/17.
 */

const q = require('q');
const https = require('https');
const querystring = require('querystring');

const googleKey = process.env.GOOGLE_KEY;

module.exports = function () {

    var api = {
        get: get
    }
    return api;

    function get(path, query) {
        var deferred = q.defer();
        https.get({
            host: 'www.googleapis.com',
            path: '/civicinfo/v2' + path +
            '?key=' + googleKey +
            '&' + querystring.stringify(query),
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                try {
                    body = JSON.parse(body);
                    deferred.resolve(body);
                } catch(e) {
                    deferred.reject({error: e});
                }

            })
        });
        return deferred.promise;
    }
}