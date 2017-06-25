/**
 * Created by Nick on 6/23/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('adminController', adminController);

    function adminController($rootScope,
                             $location,
                             userService) {
        var model = this;

        function init() {
            model.user = $rootScope.currentUser;
            model.users = [];
            for (var i = 0; i < 10; i++) {
                var temp = {
                    email: model.user.email,
                    firstName: model.user.firstName,
                    lastName: model.user.lastName,
                    dateCreated: model.user.dateCreated,
                    picture: {
                        url: model.user.picture.url
                    }
                };
                model.users.push(temp);
            }
            //model.users = userService.getUsers();
            console.log(model.user);
            console.log(model.users);
        }

        init();

        model.removeUser = function (userId) {
            userService.unregister(userId);
        };
    }
})();