/**
 * Created by vcantu on 6/20/17.
 */
var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    _discussions: { type: mongoose.Schema.Types.ObjectId, ref:"PostModel" },
    _parent:     { type: mongoose.Schema.Types.ObjectId, ref:"CommentModel" },
    dateCreated: { type: Date, default: Date.now },
    author:     {
        _id: { type: mongoose.Schema.Types.ObjectId, ref:"UserModel" },
        name:      String,
        image_url: String
        // TODO: Other user information
    },
    text: String


}, { collection: "comment" });
module.exports = commentSchema;