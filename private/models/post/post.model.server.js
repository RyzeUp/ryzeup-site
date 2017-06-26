/**
 * Created by vcantu on 6/20/17.
 */
const q        = require('q');
const mongoose = require('mongoose');
const schema   = require('./post.schema.server');
const validations = require('./post.model.validation.server');
const validate    = require('../model.validator.server')(validations);

const userModel   = require('../user/user.model.server');

var model = mongoose.model('PostModel', schema);

model.createPost = function (post) {
    return validate(post)
        .then(function(validatedPost) {
            return model.create(validatedPost);
        })
        .then(function (addedPost) {
            return userModel.addPost(post._author._id, post._id);
        })
};

model.findPostById= function (id) {
    return model.findById(id);
};

model.updatePostById = function (id, newPost) {
    return validate(newPost)
        .then(function(validatedPost) {
            return model.update(
                { _id: id },
                { $set: validatedPost });
        });
};

model.removePostById = function (id) {
    model.findPostById(id)
        .then(function (post) {
            model.remove({ _id: id })
                .then(function (status) {
                    return userModel.removePost(post._author._id, id);
                })
        })

};

model.getPosts = function () {
    return model.find();
};

model.addComment = function(postId, commentId) {
    return model.update(
        { _id: postId },
        { $push: { _comments: commentId } });
};

model.removeComment = function(postId, commentId) {
    return model.update(
        { _id: postId },
        { $pull: { _comments: commentId } });
};

model.findPostsByUsertId = function (userId) {
    model.find({ _author: { _id: userId } });
};

module.exports = model;