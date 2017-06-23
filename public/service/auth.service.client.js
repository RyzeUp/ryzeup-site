/**
 * Created by vcantu on 6/21/17.
 */
(function () {
    angular
        .module('RU')
        .factory('authService', authService);

    function authService($http) {

        return {
            login: login,
            register: register,
            logout: logout,
            loggedIn: loggedIn
        };

        function login(user) {
            return $http.post('/auth/v1/login', user)
        }

        function register(user) {
            return $http.post('/auth/v1/register', user)
        }

        function logout() {
            return $http.post('/auth/v1/logout');
        }

        function loggedIn() {
            return $http.get('/auth/v1/loggedIn');
        }
    }
})();