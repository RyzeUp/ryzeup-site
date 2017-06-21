/**
 * Created by vcantu on 6/14/17.
 */
const q = require('q');
const https = require('https');

module.exports = function () {

    var api =  {
        getHTML: getHTML
    };
    return api;

    function getHTML(gpoId) {
        var path = '/fdsys/pkg/' + gpoId + '/html/' + gpoId + '.htm';
        console.log('getting: https://www.gpo.gov/' + path);
        var deferred = q.defer();
        https.get({
            host: 'www.gpo.gov',
            path: path
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                deferred.resolve(body);

            }, function (error) {
                deferred.reject({error: e});
            })
        });
        return deferred.promise;
    }
};