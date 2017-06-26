/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .controller('navbarController', navbarController)
        .directive('ruNavbar', ruNavbar);

    function navbarController($rootScope, $location, authService, $window) {
        console.log('ctrl');
        this.user = $rootScope.currentUser;
        if (this.user) {
            this.userImgUrl = $rootScope.currentUser.picture.url;
            this.isAdmin = $rootScope.currentUser.role === 'admin';
        }

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
                    console.log('routing to login');
                    $location.url('/login')
                });
        };

        this.goToSearch = function () {
            $location.url('/search');
        };

        this.goToAdmin = function () {
            $location.url('/admin');
        };

        this.goToLogin = function () {
            $location.url('/login');
        };

        this.goToMembers = function () {
            $location.url('/members');
        };

        this.goBack = function () {
            $window.history.back();
        }

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