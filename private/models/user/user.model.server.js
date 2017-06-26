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
            var deferred = q.defer();
            model.update(
                { _id: id },
                { $set: validatedUser })
                .then(function (res) {
                    deferred.resolve(validatedUser);
                }, function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        });
};

model.updateUserPassword = function (id, newPass) {
    return model.update(
                { _id: id },
                { password: newPass });
};

model.updateUserRole = function (id, newRole) {
    return model.update(
        { _id: id },
        { role: newRole });
};

// model.updateUserRole = function (id, newRole) {
//     return model.findUserById(id)
//         .then(function (user) {
//             if (!user.roles)
//                 user.roles = [newRole];
//             else if (user.roles.indexOf(newRole) == -1)
//                 user.roles.push(newRole);
//             return model.update(
//                 {_id: id},
//                 {roles: user.roles});
//         })
// };

model.removeUserById = function (id) {
    return model.remove({ _id: id }).exec();
};

model.findUserByFacebookId = function(facebook_id) {
    return model.findOne({ 'facebook.id': facebook_id });
};

model.findUserByGoogleId = function(google_id) {
    return model.findOne({ 'google.id': google_id });
};

model.getUserPage = function(pageIdx) {
    return model.find();// TODO: pagination
};

model.addPost = function(userId, postId) {
    return model.update(
        { _id: userId },
        { $push: { _discussions: postId } });
};

model.removePost = function(userId, postId) {
    return model.update(
        { _id: userId },
        { $pull: { _discussions: postId } });
};

module.exports = model;