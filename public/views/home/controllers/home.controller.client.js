/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($http) {

        var model = this;

        $http.get('/api/congress/senate')
            .then(function (members) {
                model.members = members.data.results[0].members;
            });
    }
})();