/**
 * Created by vcantu on 6/21/17.
 */
(function () {
    angular
        .module('RU')
        .factory('adminService', adminService);

    function adminService($http) {

        return {
            users: users,
            deleteUser: deleteUser,
            updateUserRole: updateUserRole
        };

        function users() {
            return $http.get('/api/v1/admin/users');
        }

        function deleteUser(userId) {
            return $http.delete('/api/v1/admin/delete/' + userId);
        }

        function updateUserRole(user, newRole) {
            var newObj = {
                new: newRole
            };
            return $http.post('/api/v1/admin/update-role/' + user._id, newObj);
        }
    }
})();