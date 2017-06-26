/**
 * Created by vcantu on 6/22/17.
 */
const q = require('q');
const https = require('https');

module.exports = function (app, model) {

    app.get('/api/v1/posts/comments/:postId', commentsReq);
    app.post('/api/v1/comments/new', newReq);
    app.post('/api/v1/comments/update', updateReq);
    app.delete('/api/v1/comments/delete/:commentId', deleteReq);


    function commentsReq(req, res) {
        var id = req.params['postId'];
        model.findCommentsByPostId(id)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function newReq(req, res) {
        console.log('new comment');
        model.createComment(req.body)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateReq(req, res) {
        model.updateCommentById(req.body._id, req.body)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteReq(req, res) {
        var id = req.params['commentId'];
        model.removeCommentById(id)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }
};