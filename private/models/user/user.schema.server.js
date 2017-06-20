/**
 * Created by vcantu on 6/20/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: { type: String, require: true },
    username_lower: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: String,
    lastName: String,

    _following: [
        {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}
    ],

    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:     String,
        token:  String
    }
}, {collection: "user"});
module.exports = userSchema;