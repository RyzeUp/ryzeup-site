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
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html'
            })
            .when('/search', {
                templateUrl: '/views/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            });
    }
})();