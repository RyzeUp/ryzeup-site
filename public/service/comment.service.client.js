/**
 * Created by Nick on 6/26/2017.
 */
(function () {
    angular
        .module('RU')
        .factory('commentService', commentService);

    function commentService($http) {

        return {
            commentsReq: commentsReq,
            newReq: newReq,
            updateReq: updateReq,
            deleteReq: deleteReq
        };

        function commentsReq(post) {
            var url = '/api/v1/posts/comments/' + post._id;
            return $http.get(url)
                .then(function (res) {
                    console.log(res);
                    return res.data;
                });
        }

        function newReq(post) {
            var url = '/api/v1/comments/new';
            return $http.post(url, post);
        }

        function updateReq(post) {
            var url = '/api/v1/comments/update';
            return $http.post(url, post);
        }

        function deleteReq(post) {
            var url = '/api/v1/comments/delete/' + post._id;
            return $http.delete(url);
        }
    }
})();