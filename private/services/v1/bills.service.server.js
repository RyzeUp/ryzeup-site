/**
 * Created by vcantu on 6/14/17.
 */

var q = require('q');
const https = require('https');

var propublica = require('./helpers/propublica.service.server')();
var gpo        = require('./helpers/gpo.service.server')();

module.exports = function (app) {

    app.get('/api/v1/bills/recent/introduced/:chamber', introducedReq);
    app.get('/api/v1/bills/recent/updated/:chamber', updatedReq);
    app.get('/api/v1/bills/recent/passed/:chamber', passedReq);
    app.get('/api/v1/bills/details/:billId', detailsReq);
    app.get('/api/v1/bills/text/:billId', textReq);
    app.get('/api/v1/bills/votes/:chamber/:session/:rollcall', votesReq);

    function introducedReq(req, res) {
        var chamber = req.params['chamber'];
        propublica.get('/congress/v1/115/' + chamber + '/bills/introduced.json')
            .then(function (response) {
                res.json(response.results[0]);
            }, function (e) {
                res.sendStatus(404);
            });
    }
    
    function updatedReq(req, res) {
        var chamber = req.params['chamber'];
        propublica.get('/congress/v1/115/' + chamber + '/bills/updated.json')
            .then(function (response) {
                res.json(response.results[0]);
            }, function (e) {
                res.sendStatus(404);
            });
    }

    function passedReq(req, res) {
        var chamber = req.params['chamber'];
        propublica.get('/congress/v1/115/' + chamber + '/bills/passed.json')
            .then(function (response) {
                res.json(response.results[0]);
            }, function (e) {
                res.sendStatus(404);
            });
    }

    function detailsReq(req, res) {
        var billArr = req.params['billId'].split('-'); // example id 'hr21-115'
        var billId = billArr[0];
        var billCongress = billArr[1] ? billArr[1] : '115';
        propublica.get('/congress/v1/' + billCongress + '/bills/' + billId + '.json')
            .then(function (response) {
                res.json(response.results[0]);
            }, function (e) {
                res.sendStatus(404);
            });
    }

    function textReq(req, res) {
        var billArr = req.params['billId'].split('-'); // example id 'hr21-115'
        var billId = billArr[0];
        var billCongress = billArr[1] ? billArr[1] : '115';
        propublica.get('/congress/v1/' + billCongress + '/bills/' + billId + '.json')
            .then(function (response) {
                var deferred = q.defer();
                deferred.resolve(response.results[0]);
                return deferred.promise;
            }, function (e) {
                res.sendStatus(404);
            })
            .then(function (response) {
                var gpoId = getGpoId(response.gpo_pdf_uri);
                return gpo.getHTML(gpoId);
            })
            .then(function (response) {
                res.send(response);
            }, function (e) {
                res.sendStatus(404);
            })
    }

    function getGpoId(uri) {
        var start = uri.indexOf('/pdf/') + '/pdf/'.length;
        var end = uri.length - 4;
        return uri.substring(start, end);
    }

    function votesReq(req, res) {
        var chamber = req.params['chamber'];
        var session = req.params['session'];
        var rollcall = req.params['rollcall'];
        propublica.get('/congress/v1/115/' + chamber + '/sessions/' + session + '/votes/' + rollcall + '.json')
            .then(function (response) {
                res.json(response.results);
            }, function (e) {
                res.sendStatus(404);
            });
    }


};