/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($http,
                            congressService) {
        var model = this;

        function init() {
            congressService.senateReq()
        };
        init();
        $http.get('/api/congress/senate')
            .then(function (members) {
                model.members = members.data.results[0].members;
            });
    }
})();