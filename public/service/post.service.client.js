/**
 * Created by Nick on 6/19/2017.
 */
(function () {
    angular
        .module('RU')
        .factory('postService', postService);

    function postService($http) {

        return {
            recentReq: recentReq,
            newReq: newReq,
            updateReq: updateReq,
            deleteReq: deleteReq
        };

        function recentReq() {
            var url = '/api/v1/posts/recent';
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                })
        }

        function newReq(post) {
            var url = '/api/v1/posts/new';
            return $http.post(url, post);
        }

        function updateReq(post) {
            var url = '/api/v1/posts/update';
            return $http.post(url, post);
        }

        function deleteReq(post) {
            var url = '/api/v1/posts/delete/' + post._id;
            return $http.post(url);
        }
    }
})();