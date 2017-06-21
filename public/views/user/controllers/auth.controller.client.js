/**
 * Created by vcantu on 6/17/17.
 */
(function () {
    angular
        .module('RU')
        .controller('loginController', loginController);

    function loginController(authService, $location) {
        var model = this;

        model.login = function () {
            authService.login(model.user);
            $location.route('#!/')
        }
    }

    angular
        .module('RU')
        .controller('registerController', registerController);

    function registerController(authService, $location) {
        var model = this;

        model.register = function () {
            authService.register(model.user);
        }
    }
})();