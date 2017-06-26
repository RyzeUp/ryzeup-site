/**
 * Created by vcantu on 6/22/17.
 */
const q = require('q');
const https = require('https');

module.exports = function (app, model) {

    app.get('/api/v1/posts/recent', recentReq);
    app.post('/api/v1/posts/new', newReq);
    app.post('/api/v1/posts/update', updateReq);
    app.delete('/api/v1/posts/delete/:postId', deleteReq);


    function recentReq(req, res) {
        model.getPosts()
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function newReq(req, res) {
        model.createPost(req.body)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateReq(req, res) {
        model.createPost(req.body._id, req.body)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteReq(req, res) {
        var id = req.params['postId'];
        model.removePostById(id)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }
};