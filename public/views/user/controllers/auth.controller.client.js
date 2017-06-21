/**
 * Created by vcantu on 6/17/17.
 */
(function () {
    angular
        .module('RU')
        .controller('loginController', loginController);

    function loginController(authService) {
        var model = this;

        model.login = function () {
            authService.login(model.user);
        }
    }

    angular
        .module('RU')
        .controller('registerController', registerController);

    function registerController(authService) {
        var model = this;

        model.register = function () {
            authService.register(model.user);
        }
    }
})();