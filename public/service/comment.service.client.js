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

        function commentsReq(postId) {
            var url = '/api/v1/posts/comments/' + postId;
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

        function deleteReq(postId) {
            var url = '/api/v1/comments/delete/' + postId;
            return $http.delete(url);
        }
    }
})();