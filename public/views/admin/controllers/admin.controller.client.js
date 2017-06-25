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
            model.possibleRoles = ['admin', 'senator', 'user'];
            model.user = $rootScope.currentUser;
            // Temporary until userService allows the grabbing of all users
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
            // Temporary code over, back to our regularly scheduled programming, GET IT
            // model.users = userService.getUsers();
            console.log(model.user);
            console.log(model.users);
        }

        init();

        model.removeUser = function (userId) {
            userService.unregister(userId);
        };

        model.setUserRole = function (user, selectedRole) {
            var index = model.possibleRoles.indexOf(selectedRole);
            user.roles = [];
            for (var i = index; i < model.possibleRoles.length; i++) {
                user.roles.push(model.possibleRoles[i]);
            }
            userService.updateUser(user)
                .then(function (res) {
                    console.log('updated user roles');
                });
            return user.roles[0];
        };
    }
})();