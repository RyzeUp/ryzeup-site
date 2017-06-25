/**
 * Created by Nick on 6/25/2017.
 */
var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    title: String,
    content: String,
    _author: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    _bill: {type: mongoose.Schema.Types.ObjectId, ref: "BillModel"},
    _discussion: {type: mongoose.Schema.Types.ObjectId, ref: "DiscussionModel"}
}, {collection: "post"});
module.exports = postSchema;