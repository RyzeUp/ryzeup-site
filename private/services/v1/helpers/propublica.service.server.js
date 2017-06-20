/**
 * Created by vcantu on 6/14/17.
 */
const q = require('q');
const https = require('https');

const proPublicaKey = process.env.PRO_PUBLICA_KEY;

module.exports = function () {

    var api =  {
        get: get
    };
    return api;

    function get(path) {
        console.log('getting: https://api.propublica.org' + path);
        var deferred = q.defer();
        https.get({
            host: 'api.propublica.org',
            path: path,
            headers: {
                'X-API-Key': proPublicaKey
            }
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                try {
                    body = JSON.parse(body);
                    if (body.status === "ERROR") {
                        deferred.reject({error: e});
                    }
                    else {
                        deferred.resolve(body);
                    }
                } catch(e) {
                    deferred.reject({error: e});
                }

            })
        });
        return deferred.promise;
    }
};