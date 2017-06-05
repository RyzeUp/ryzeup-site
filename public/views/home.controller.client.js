/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($http) {

        var model = this;

        var config = {headers:  {
            'X-API-Key': ''
        }
        };

        $http
            .get("https://api.propublica.org/congress/v1/115/senate/members.json", config)
            .then(function (response) {
                model.members = response.data.results[0].members;
            });
    }
})();