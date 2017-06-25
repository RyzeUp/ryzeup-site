/**
 * Created by Nick on 6/23/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('adminController', adminController);

    function adminController($rootScope,
                             $location,
                             adminService,
                             $scope) {
        var model = this;
        model.roles = ['user', 'contributor', 'admin'];

        function init() {
            model.user = $rootScope.currentUser;
            adminService.users()
                .then(function (res) {
                    model.users = res.data;
                    for (var u in model.users) {
                        var user = model.users[u];
                        $scope.$watch('model.users[' + u + '].role',
                        function (newVal, oldVal) {
                            if (oldVal !== newVal) {
                                console.log('chaging', model.users[u].firstName)
                                //adminService.updateUserRole(user._id, newVal);
                            }
                        }, true);
                    }
                });
        }
        init();

        model.removeUser = function (userId) {
            adminService.deleteUser(userId)
                .then(function (res) {
                    for (var u in model.users) {
                        if (model.users[u]._id === userId)
                            model.users.splice(u, 1);
                    }
                }, function (err) {
                    // show error

                })
        };
    }
})();