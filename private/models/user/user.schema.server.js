/**
 * Created by vcantu on 6/20/17.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    // username: { type: String },
    // username_lower: { type: String, unique: true },
    password: { type: String },
    email: { type: String, require: true, unique: true},

    firstName:  String,
    middleName: String,
    lastName:   String,
    gender:     { type: String },

    picture: {
        is_unset: Boolean,
        url:      String
    },

    dateCreated: { type: Date, default: Date.now },
    facebook: {
        id:     String,
        token:  String,
        picture: {
            is_silhouette: Boolean,
            url:           String
        }
    },
    google: {
        id:     String,
        token:  String,
        picture: {
            isDefault:    Boolean,
            url:           String
        }
    },

    _following: [
        { type: mongoose.Schema.Types.ObjectId, ref:"UserModel" }
    ]

}, { collection: "user" });
module.exports = userSchema;