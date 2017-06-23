/**
 * Created by vcantu on 6/21/17.
 */
(function () {
    angular
        .module('RU')
        .factory('userService', userService);

    function userService($http) {

        return {
            unregister:     unregister,
            updateUser:     updateUser,
            updatePassword: updatePassword,
        };

        function unregister(user) {
            return $http.get('/api/v1/user/unregister/' + user._id);
        }

        function updateUser(user) {
            return $http.post('/api/v1/user/update/' + user._id, user);
        }

        function updatePassword(user, newPassword) {
            return $http.post('/api/v1/user/newpass/' + user._id, newPassword);
        }
    }
})();