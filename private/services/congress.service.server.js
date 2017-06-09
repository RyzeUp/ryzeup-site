/**
 * Created by vcantu on 6/7/17.
 */

var q = require('q');
const https = require('https');
var proPublicaKey = process.env.PRO_PUBLICA_KEY;

module.exports = function (app) {

    app.get('/api/congress/senate', getSenate);
    app.get('/api/congress/house', getHouse);

    var senateCache = null;
    var houseCache = null;

    function getHouse(req, res) {
        if (houseCache == null) {
            getProPublica('/congress/v1/115/house/members.json')
                .then(function (response) {
                    senateCache = response;
                    res.json(response);
                }, function (error) {
                    res.sendStatus(404).send(error);
                })
        }
        else {
            res.json(senateCache);
        }
    }

    function getSenate(req, res) {
        if (senateCache == null) {
            getProPublica('/congress/v1/115/senate/members.json')
                .then(function (response) {
                    senateCache = response;
                    res.json(response);
                }, function (error) {
                    res.sendStatus(404).send(error);
                })
        }
        else {
            res.json(senateCache);
        }
    }

    function getProPublica(path) {
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
                    deferred.resolve(body);
                } catch(e) {
                    deferred.reject({error: e});
                }

            })
        });
        return deferred.promise;
    }

};
