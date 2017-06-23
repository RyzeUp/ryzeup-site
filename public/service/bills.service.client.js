/**
 * Created by Nick on 6/19/2017.
 */
(function () {
    angular
        .module('RU')
        .factory('billsService', billsService);

    function billsService($http) {

        return {
            introduced: introduced,
            updated: updated,
            passed: passed,
            details: details,
            text: text,
            votes: votes
        };

        function introduced(chamber) {
            var url = 'api/v1/bills/recent/introduced' + chamber;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }
        function updated(chamber) {
            var url = 'api/v1/bills/recent/updated' + chamber;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }
        function passed(chamber) {
            var url = 'api/v1/bills/recent/passed' + chamber;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }

        function details(billId) {
            var url = 'api/v1/bills/details/' + billId;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }

        function text(billId) {
            var url = 'api/v1/bills/text/' + billId;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }

        function votes(chamber, session, rollcall) {
            var url = 'api/v1/bills/votes/' +
                chamber  + '/' +
                session  + '/' +
                rollcall + '/';
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }
    }
})();