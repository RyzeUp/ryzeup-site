/**
 * Created by vcantu on 6/13/17.
 */
(function () {
    angular
        .module('RU')
        .controller('searchController', searchController);

    function searchController($http, congressService) {

        var model = this;

        model.search = function(searchText) {
            model.loading = true;
            congressService.searchReq(searchText)
                .then(function (res) {
                    model.loading = false;
                    console.log(res.data);
                    model.members = res.data;
                })
            // $http.get('/api/civicinfo/representatives?address=' + searchText)
            //     .then(function (response) {
            //         var state = null;
            //         var district = null;
            //         console.log(response.data);
            //
            //         for (var d in response.data.divisions) {
            //             var s = d.indexOf('/state:');
            //             var c = d.indexOf('/cd:');
            //             if (s != -1 && !state) {
            //                 state = d.substring(s + 7, s + 9);
            //             }
            //             if (c != -1 && !district) {
            //                 district = d.substring(c + 4);
            //                 break;
            //             }
            //         }
            //
            //
            //         if (state) {
            //             var url = '/api/v1/congress/search?state=' + state +
            //                 (district ? '&district=' + district : '');
            //             $http.get(url)
            //                 .then(function (response) {
            //                     model.loading = false;
            //                     model.members = response.data;
            //                     console.log('members', model.members);
            //                 })
            //         }
            //     });
        }
    }
})();