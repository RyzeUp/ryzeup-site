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
                        setTopRole(user);

                        $scope.$watch('model.users[' + u + '].topRole',
                        function (oldVal, newVal) {
                            console.log(user.firstName,
                                oldVal, ' -> ', newVal);

                            adminService.updateUserRole(user._id, topRole);
                        }, true);
                    }
                });
        }
        init();

        model.removeUser = function (userId) {
            adminService.deleteUser(userId)
                .then(function (res) {
                    for (var u in model.users) {
                        console.log('removed');
                        if (model.users[u]._id === userId)
                            model.users.splice(u, 1);
                    }
                }, function (err) {
                    // show error

                })
        };

        function setTopRole(user) {
            console.log(user.roles);
            if (user.roles.indexOf('admin') != -1)
                user.topRole = 'admin';
            else if (user.roles.indexOf('contributor') != -1)
                user.topRole = 'contributor'
            else
                user.topRole = 'user'
        }
    }
})();