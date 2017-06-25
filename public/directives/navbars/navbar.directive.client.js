/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .controller('navbarController', navbarController)
        .directive('ruNavbar', ruNavbar);

    function navbarController($rootScope, $location, authService) {
        this.userImgUrl = $rootScope.currentUser.picture.url;
        this.isAdmin = $rootScope.currentUser.role === 'admin';

        this.goToHome = function () {
            $location.url('/');
        };

        this.profileClick = function () {
            if ($rootScope.currentUser) {
                $location.url('/profile');
            }
            else {
                $location.url('/login');
            }
        };

        this.logoutClick = function () {
            authService.logout()
                .then(function () {
                    $location.url('/login')
                });
        };

        this.goToSearch = function () {
            $location.url('/search');
        };

        this.goToAdmin = function () {
            $location.url('/admin');
        };
    }

    function ruNavbar($rootScope) {
        return {
            require: "ngModel",
            scope: {
                model: "=model"
            },
            templateUrl: "/directives/navbars/navbar.view.client.html"
        };
    }
})();