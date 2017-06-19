/**
 * Created by vcantu on 6/7/17.
 */

const q = require('q');
const https = require('https');

var google = require('./helpers/google.service.server')();

module.exports = function (app) {

    app.get('/api/civicinfo/candidates', getCandidates);
    app.get('/api/civicinfo/representatives', getRepresentatives);

    function getCandidates(req, res) {
        google.get('/voterinfo', req.query)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404).send(error);
            })
    }

    function getRepresentatives(req, res) {
        google.get('/representatives', req.query)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404).send(error);
            })
    }

};
