<<<<<<< HEAD:private/services/congress.service.server.js
/**
 * Created by vcantu on 6/7/17.
 */

const q = require('q');
const https = require('https');
const levenshtein = require('fast-levenshtein');

var propublica = require('./propublica.service.server')();

module.exports = function (app) {

    app.get('/api/congress/senate', senateReq);
    app.get('/api/congress/house', houseReq);

    app.get('/api/congress/search', search);

    var senateCache = null;
    var houseCache = null;

    function searchByName(req, res, name) {
        var names = name.split(' ');

        getSenate()
            .then(function (response) {
                console.log(senate);
                getHouse()
                    .then(function (house) {
                        console.log(house);
                    })
            }, function (error) {
                res.sendStatus(404);
            })
        res.sendStatus(200);
    }

    function searchByRegion(req, res, state, district) {
    }


    function search(req, res) {
        var result = [];
        var state = req.query.state;
        var district = req.query.district;
        var name = req.query.name;

        if (state) {
            propublica.get('/congress/v1/members/senate/' + state + '/current.json')
                .then(function (response) {
                    for (var i in response.results) {
                        result.push(response.results[i]);
                    }
                    var url = '/congress/v1/members/house/' + state +
                        (district ? '/' + district : '') + '/current.json'
                    propublica.get(url)
                        .then(function (response) {
                            for (var i in response.results) {
                                result.push(response.results[i]);
                            }
                            res.json(result);
                        }, function (err) {
                            res.json(result);
                        });
                }, function (err) {
                    res.sendStatus(404);
                })
        }
        else if (name) {
            searchByName(req, res, name);
        }
    }

    function houseReq(req, res) {
        getHouse()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getHouse() {
        var deferred = q.defer();
        if (!houseCache) {
            propublica.get('/congress/v1/115/house/members.json')
                .then(function (response) {
                    houseCache = response;
                    deferred.resolve(response);
                }, function (e) {
                    deferred.reject({error: e});
                })
        }
        else {
            console.log('getting: from cache');
            deferred.resolve(houseCache);
        }
        return deferred.promise;
    }

    function senateReq(req, res) {
        getSenate()
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getSenate() {
        var deferred = q.defer();
        if (!senateCache) {
            propublica.get('/congress/v1/115/senate/members.json')
                .then(function (response) {
                    senateCache = response;
                    deferred.resolve(senateCache);
                }, function (e) {
                    deferred.reject({error: e});
                })
        }
        else {
            console.log('getting: from cache');
            deferred.resolve(senateCache);
        }
        return deferred.promise;
    }
};
=======
/**
 * Created by vcantu on 6/7/17.
 */

const q = require('q');
const https = require('https');
const levenshtein = require('fast-levenshtein');

var propublica = require('./helpers/propublica.service.server')();

module.exports = function (app) {

    console.log('setting apis');
    app.get('/api/v1/congress/senate', senateReq);
    app.get('/api/v1/congress/house', houseReq);

    app.get('/api/v1/congress/search', search);

    var senateCache = null;
    var houseCache = null;

    function searchByName(req, res, name) {
        var names = name.split(' ');

        getSenate()
            .then(function (response) {
                console.log(senate);
                getHouse()
                    .then(function (house) {
                        console.log(house);
                    })
            }, function (error) {
                res.sendStatus(404);
            })
        res.sendStatus(200);
    }

    function searchByRegion(req, res, state, district) {
    }


    function search(req, res) {
        var result = [];
        var state = req.query.state;
        var district = req.query.district;
        var name = req.query.name;

        if (state) {
            propublica.get('/congress/v1/members/senate/' + state + '/current.json')
                .then(function (response) {
                    for (var i in response.results) {
                        result.push(response.results[i]);
                    }
                    var url = '/congress/v1/members/house/' + state +
                        (district ? '/' + district : '') + '/current.json'
                    propublica.get(url)
                        .then(function (response) {
                            for (var i in response.results) {
                                result.push(response.results[i]);
                            }
                            res.json(result);
                        }, function (err) {
                            res.json(result);
                        });
                }, function (err) {
                    res.sendStatus(404);
                })
        }
        else if (name) {
            searchByName(req, res, name);
        }
    }

    function houseReq(req, res) {
        return getHouse()
            .then(function (response) {
                res.json(response.results);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getHouse() {
        var deferred = q.defer();
        if (!houseCache) {
            propublica.get('/congress/v1/115/house/members.json')
                .then(function (response) {
                    houseCache = response;
                    deferred.resolve(response);
                }, function (e) {
                    deferred.reject({error: e});
                })
        }
        else {
            console.log('getting: from cache');
            deferred.resolve(houseCache);
        }
        return deferred.promise;
    }

    function senateReq(req, res) {
        getSenate()
            .then(function (response) {
                //unwrap response
                res.json(response.results);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getSenate() {
        var deferred = q.defer();
        if (!senateCache) {
            propublica.get('/congress/v1/115/senate/members.json')
                .then(function (response) {
                    senateCache = response;
                    deferred.resolve(senateCache);
                }, function (e) {
                    deferred.reject({error: e});
                })
        }
        else {
            console.log('getting: from cache');
            deferred.resolve(senateCache);
        }
        return deferred.promise;
    }
};
>>>>>>> f132fa20b88e1bd8d50beeb82ff610251aa74cac:private/services/v1/congress.service.server.js
