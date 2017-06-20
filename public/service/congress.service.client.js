/**
 * Created by Nick on 6/19/2017.
 */
(function () {
    angular
        .module('RU')
        .factory('congressService', congressService);

    function congressService($http) {

        return {
            search: search,
            houseReq: houseReq,
            senateReq: senateReq,
            memberReq: memberReq,
            detailsReq: detailsReq
        };

        function search(state, district, name) {
            var url = '/api/v1/congress/search' +
                '?state=' + state +
                '&district=' + district +
                '&name=' + name;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }

        function houseReq() {
            var url = '/api/v1/congress/house';
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }

        function senateReq() {
            var url = '/api/v1/congress/senate';
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }

        function memberReq(memberId) {
            var url = '/api/v1/congress/member/' + memberId;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }

        function detailsReq(memberId) {
            var url = '/api/v1/congress/details/' + memberId;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }
    }
})();