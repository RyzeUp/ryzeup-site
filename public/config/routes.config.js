/**
 * Created by vcantu on 5/24/17.
 */
(function () {
    angular
        .module('RU')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
        //.when('/', {
        //    templateUrl: 'views/landing/templates/landing.view.client.html'
        //})
            .when('/', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/bills', {
                templateUrl: '/views/.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/representative/details/:repid', {
                templateUrl: 'views/representative/templates/representative.view.client.html',
                controller: 'representativeController',
                controllerAs: 'model'
            })
            .when('/post/details/:postid', {
                templateUrl: 'views/post/templates/post.view.client.html',
                controller: 'postController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    isAdmin: checkAdmin
                }
            });
    }

    var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/auth/v1/loggedin')
            .then(function (user) {
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

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        checkLoggedIn($q, $timeout, $http, $location, $rootScope)
            .then(function (user) {
                if (!user.role === 'admin') {
                    $location.url('/');
                }
            })
    };
})();