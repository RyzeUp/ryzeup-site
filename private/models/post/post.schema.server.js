/**
 * Created by vcantu on 6/20/17.
 */
var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    _author:     {
        _id: { type: mongoose.Schema.Types.ObjectId, ref:"UserModel" },
        name:      String,
        imageUrl: String
        // TODO: Other user information
    },
    title: String,
    text: String,
    billId: String

}, { collection: "post" });
module.exports = postSchema;