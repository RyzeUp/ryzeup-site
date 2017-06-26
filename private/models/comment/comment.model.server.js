/**
 * Created by vcantu on 6/20/17.
 */
const q        = require('q');
const mongoose = require('mongoose');
const schema   = require('./comment.schema.server');
const validations = require('./comment.model.validation.server');
const validate    = require('../model.validator.server')(validations);

const commentModel   = require('../comment/comment.model.server');


var model = mongoose.model('CommentModel', schema);


model.createComment = function (comment) {
    return validate(comment)
        .then(function(validatedComment) {
            return model.create(validatedComment);
        })
        .then(function (addedComment) {
            return commentModel.addPost(comment._discussion._id, comment._id);
        })
};

model.findCommentById = function (id) {
    return model.findById(id);
};

model.updateCommentById = function (id, newComment) {
    return validate(newComment)
        .then(function(validatedComment) {
            return model.update(
                { _id: id },
                { $set: validatedComment });
        });
};

model.removeCommentById = function (id) {
    return model.remove({ _id: id });
};

model.findCommentsByPostId = function (postId) {
    model.find({ _discussion: postId });
};

module.exports = model;