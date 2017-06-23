/**
 * Created by Nick on 6/23/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('profileController', profileController);

    function adminController($location,
                             $rootScope,
                             userService) {
        var model = this;
        model.user = $rootScope.currentUser;
        model.users = $rootScope.currentUser;//userService.getUsers();
    }
}());