/**
 * Created by vcantu on 6/20/17.
 */
const q        = require('q');
const mongoose = require('mongoose');
const schema   = require('./user.schema.server');
const validations = require('./user.model.validation.server');
const validate    = require('../model.validator.server')(validations);

var model = mongoose.model('UserModel', schema);

model.createUser = function (user) {
    return validate(user)
        .then(function(validatedUser) {
            return model.create(validatedUser);
        });
};

model.findUserById = function (id) {
    return model.findById(id);
};

model.findByUsername = function (username) {
    return model.findOne({ username_lower: username.toLowerCase() });
};

model.findByEmail = function (email) {
    return model.findOne({ email: email });
};
model.updateUserById = function (id, newUser) {
    return validate(newUser)
        .then(function(validatedUser) {
            return model.update(
                { _id: id },
                { $set: validatedUser });
        });
};

model.removeUserById = function (id) {
    return model.remove({ _id: id })
};

model.findUserByFacebookId = function(facebook_id) {
    return model.findOne({ 'facebook.id': facebook_id });
};

model.findUserByGoogleId = function(google_id) {
    return model.findOne({ 'google.id': google_id });
};

module.exports = model;