/**
 * Created by vcantu on 6/17/17.
 */
(function () {
    angular
        .module('RU')
        .controller('profileController', profileController)

    function profileController(userService, $location, $rootScope) {
        var model = this;
        model.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        model.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return { abbrev: state} ;
        });

        model.user = $rootScope.currentUser;
        console.log(model.user);

        model.login = function () {
            if ($scope.loginForm.$valid) {
                authService.login(model.user)
                    .then(function (response) {
                        $location.url('/');
                    }, function (error) {
                        model.message = 'Invalid username or password. Please try again';
                    });
            }
        };

        model.unregister = function () {
            userService.unregister(model.user)
                .then(function (res) {
                    //TODO: let user know he successfully logged out
                    $location.url('/login');
                });
        };

        model.updateProfile = function () {
            userService.updateUser(model.user)
                .then(function (res) {
                    console.log(res);
                    model.user = user;
                });
        };

        model.changePassword = function () {
            console.log(model.newPassword, '===', model.newPassword2);
            if (model.newPassword === model.newPassword2) {
                console.log('sending new pass');
                userService.updatePassword(model.user, model.newPassword)
                    .then(function (res) {
                        console.log(res);
                        model.user = user;
                    });
            }
        }
    }
})();