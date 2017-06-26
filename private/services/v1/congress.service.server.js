/**
 * Created by vcantu on 6/7/17.
 */

const q = require('q');
const https = require('https');
const levenshtein = require('fast-levenshtein');

const propublica = require('./helpers/propublica.service.server')();
const google = require('./helpers/google.service.server')();

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

    function searchHouseBy(results, ocdId, name, state, district) {
        var deferred = q.defer();
        getHouse()
            .then(function (house) {
                for (var r in house.members) {
                    var found = false;
                    var rep = house.members[r];
                    if (!found && name) {
                        var names = name.split(' ');
                        for (var n in names) {
                            if (rep.first_name.toLowerCase() === names[n].toLowerCase()) {
                                results.push(rep);
                                break;
                            }
                            else if (rep.last_name.toLowerCase() === names[n].toLowerCase()) {
                                results.push(rep);
                                break;
                            }
                        }
                    }
                    if (state) {
                        if (rep.state === state.toUpperCase()) {
                            console.log(rep.first_name);
                            console.log(district);
                            if (district) {
                                if (rep.district == district) {
                                    results.push(rep);
                                    found = true;
                                }
                            }
                            else {
                                results.push(rep);
                                found = true;
                            }
                        }
                    }
                    if (!found && ocdId) {
                        if (rep.ocd_id === ocdId) {
                            results.push(rep);
                            found = true;
                        }
                    }
                }
                deferred.resolve({
                    ocdId: ocdId,
                    name: name,
                    state: state,
                    district: district,
                    results: results
                });
            });
        return deferred.promise;
    }

    function searchSenateBy(ocdId, name, state, district) {
        var deferred = q.defer();
        results = [];
        getSenate()
            .then(function (senate) {
                for (var s in senate.members) {
                    var found = false;
                    var sen = senate.members[s];
                    if (!found && name) {
                        var names = name.split(' ');
                        for (var n in names) {
                            if (sen.first_name.toLowerCase() === names[n].toLowerCase()) {
                                results.push(sen);
                                break;
                            }
                            else if (sen.last_name.toLowerCase() === names[n].toLowerCase()) {
                                results.push(sen);
                                break;
                            }
                        }
                    }
                    if (!found && state) {
                        if (sen.state === state.toUpperCase()) {
                            results.push(sen);
                            found = true;
                        }
                    }
                    if (!found && ocdId) {
                        if (sen.ocd_id === ocdId) {
                            results.push(sen);
                            found = true;
                        }
                    }
                }
                deferred.resolve({
                    ocdId: ocdId,
                    name: name,
                    state: state,
                    district: district,
                    results: results
                });
            });
        return deferred.promise;
    }

    function search(req, res) {
        var result = [];
        var state = req.query.state;
        var district = req.query.district;
        var name = req.query.name;
        var query = req.query.query;

        console.log('query search', query);
        if (query) {
            google.get('/representatives', { address: req.query.query })
                .then(function (response) {
                    var state;
                    var district;
                    for (var d in response.divisions) {
                        var s = d.indexOf('/state:');
                        var c = d.indexOf('/cd:');
                        if (s != -1 && !state) {
                            state = d.substring(s + 7, s + 9);
                        }
                        if (c != -1 && !district) {
                            district = d.substring(c + 4);
                            break;
                        }
                    }
                    return searchSenateBy(null, req.query.query, state, district);
                })
                .then(function (result) {
                    return searchHouseBy(
                        result.results,
                        result.ocdId,
                        result.name,
                        result.state,
                        result.district
                    )
                })
                .then(function (result) {
                    res.json(result.results);
                }, function (err) {
                    res.sendStatus(404);
                })
        }

        if (name) {
            console.log('searching by ', name);
            searchSenateBy(null, name, null)
                .then(function (results) {
                    console.log('results = ', results);
                    res.json(results);
                })
        }
    }


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
