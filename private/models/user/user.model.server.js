/**
 * Created by vcantu on 6/20/17.
 */
const mongoose = require('mongoose');
const schema   = require('./user.schema.server');
const validate = require('./user.validation.server');

var model = mongoose.model('UserModel', schema);

model.createUser = function (user) {
    console.log('creating model');
    return model.create(validate(user));
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
    return model.update(
        { _id: id },
        { $set: validate(newUser) });
};

model.removeUserById = function (id) {
    return model.remove({ _id: id })
};

model.findUserByFacebookId = function(facebook_id) {
    return model.findOne({ 'facbook.id': facebook_id });
};

module.exports = model;