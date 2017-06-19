/**
 * Created by vcantu on 6/7/17.
 */

const q = require('q');
const https = require('https');
const levenshtein = require('fast-levenshtein');

var propublica = require('./helpers/propublica.service.server')();

module.exports = function (app) {

    app.get('/api/v1/congress/senate', senateReq);
    app.get('/api/v1/congress/house', houseReq);
    app.get('/api/v1/congress/member/:memberId', memberReq);
    app.get('/api/v1/congress/details/:memberId', detailsReq);

    app.get('/api/v1/congress/search', search);

    var senateCache = null;
    var houseCache = null;

    getHouse();
    getSenate();


    function memberReq(req, res) {
        var id = req.params['memberId'];
        getSenate()
            .then(function (senate) {
                for (var s in senate.members) {
                    if (senate.members[s].id === id) {
                        res.json(senate.members[s]);
                        return;
                    }
                }
                getHouse()
                    .then(function (house) {
                        for (var h in house.members) {
                            if (house.members[h].id === id) {
                                res.json(house.members[h]);
                                return;
                            }
                        }
                        res.sendStatus(404);
                    });
            });
    }

    function detailsReq(req, res) {
        var id = req.params['memberId'];
        propublica.get('/congress/v1/members/' + id + '.json')
            .then(function (response) {
                res.json(response.results[0]);
            }, function (e) {
                res.sendStatus(404);
            });
    }

    //TODO NOT DONE
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
            });
        res.sendStatus(200);
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
                            res.json(result[0]);
                        }, function (err) {
                            res.json(result[0]);
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
            .then(function (house) {
                res.json(house);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getHouse() {
        var deferred = q.defer();
        if (!houseCache) {
            propublica.get('/congress/v1/115/house/members.json')
                .then(function (response) {
                    houseCache = response.results[0];
                    deferred.resolve(houseCache);
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
            .then(function (senate) {
                //unwrap response
                res.json(senate);
            }, function (error) {
                res.sendStatus(404);
            })
    }

    function getSenate() {
        var deferred = q.defer();
        if (!senateCache) {
            propublica.get('/congress/v1/115/senate/members.json')
                .then(function (response) {
                    senateCache = response.results[0];
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
