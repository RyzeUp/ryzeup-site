/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .controller('postItemController', postItemController)
        .directive('postItem', postItem);

    function postItemController($rootScope, $scope, $location) {
        this.userImgUrl = $scope.post._author.imageUrl;
        console.log('post', $scope.post)

        this.goToPostDetailsPage = function (postId) {
            $location.url('/post/details/' + postId);
        };

        this.followPost = function (postid) {
            console.log('follow does not work yet')
            //TODO FOLLOW
        };
    }

    function postItem() {
        return {
            require: "ngModel",
            scope: {
                post:   "=post"
            },
            templateUrl: "/directives/posts/post.item.view.client.html"
        };
    }
})();