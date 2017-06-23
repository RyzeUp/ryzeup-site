/**
 * Created by vcantu on 6/17/17.
 */
(function () {
    angular
        .module('RU')
        .controller('loginController', loginController)
        .controller('registerController', registerController)
        .directive('compareTo', compareTo);

    function loginController(authService, $location, $scope) {
        var model = this;

        model.login = function () {
            if ($scope.loginForm.$valid) {
                authService.login(model.user)
                    .then(function (response) {
                        $location.url('/');
                    }, function (error) {
                        model.message = 'Invalid username or password. Please try again';
                    });
            }
        }
    }

    function registerController(authService, $location, $scope) {
        var model = this;

        model.register = function () {
            if ($scope.registerForm.valid) {
                authService.register(model.user)
                    .then(function (response) {
                        $location.url('/');
                    }, function (error) {
                        console.log('some invalid fields');
                    });
            }
        }
    }

    function compareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }
})();