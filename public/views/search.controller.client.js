/**
 * Created by vcantu on 6/13/17.
 */
(function () {
    angular
        .module('RU')
        .controller('searchController', searchController);

    function searchController($http) {

        var model = this;

        model.search = function(searchText) {
            $http.get('/api/civicinfo/representatives?address=' + searchText)
                .then(function (response) {
                    var state = null;
                    var district = null;

                    for (var d in response.data.divisions) {
                        var s = d.indexOf('/state:');
                        var c = d.indexOf('/cd:');
                        if (s != -1 && !state) {
                            state = d.substring(s + 7, s + 9);
                        }
                        if (c != -1 && !district) {
                            district = d.substring(c + 4);
                            break;
                        }
                    }


                    if (state) {
                        var url = '/api/congress/search?state=' + state +
                            (district ? '&district=' + district : '');
                        $http.get(url)
                            .then(function (response) {
                                model.members = response.data;
                                console.log(model.members);
                            })
                    }
                });
        }
    }
})();