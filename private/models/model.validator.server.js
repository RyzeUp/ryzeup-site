/**
 * Created by vcantu on 6/21/17.
 */
const q = require('q');
module.exports = function (validations) {

    var failure = '';
    return function (obj) {
        var deferred = q.defer();
        obj = validate(obj);
        if (obj)
            deferred.resolve(obj);
        else
            deferred.reject('model validation failed: ' + failure);
        return deferred.promise;
    };

    function validate(obj) {
        if (!obj) {
            failure = 'object is undefined';
            return null;
        }
        for (var v in validations) {
            obj = validations[v](obj);
            if (!obj) {
                failure = 'did not pass ' + v;
                return null;
            }
        }
        return obj;
    }
}