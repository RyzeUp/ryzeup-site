/**
 * Created by vcantu on 5/24/17.
 */
(function () {
    angular
        .module('RU')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when('/representative/details/:repid', {
                templateUrl: '/views/representative/templates/representative.view.client.html',
                controller: 'representativeController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: '/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: '/views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: '/views/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            });
    }

    var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/auth/v1/loggedin')
            .then(function (user) {
                console.log('response', user);
                $rootScope.errorMessage = null;
                if (user.data !== '0') {
                    $rootScope.currentUser = user.data;
                    deferred.resolve(user.data);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };
})();