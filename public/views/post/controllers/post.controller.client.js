/**
 * Created by Nick on 6/25/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('postController', postController);

    function postController($routeParams,
                            billsService,
                            postService,
                            commentService) {
        var model = this;

        function init() {
            postService.recentReq()
                .then(function (res) {
                    model.post = res.find(function (x) {
                        return x._id == $routeParams['postid'];
                    });
                    console.log(model.post);
                });

            commentService.commentsReq($routeParams['postid'])
                .then(function (res) {
                    model.comments = res;
                    console.log('hello comments');
                    console.log(model.comments);
                });
        }

        init();

        model.followPost = function (postid) {
            //TODO FOLLOW
        };

        function createTestComments() {
            model.comments = [];
            for (var i = 0; i < 10; i++) {
                var temp = {
                    _id: i,
                    _discussion: $routeParams['postid'],
                    dateCreated: new Date(Date.now()).toLocaleString(),
                    author: {
                        _id: i,
                        name: 'Barack Obama' + i,
                        image_url: 'i'
                    },
                    text: 'This is the body of comment ' + i
                };
                model.comments.push(temp);
            }
            console.log(model.post);
            console.log(model.comments);
        }
    }
})();