/**
 * Created by Nick on 6/25/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('postController', postController)
        .controller('newPostController', newPostController);

    function postController($rootScope,
                            $routeParams,
                            billsService,
                            postService,
                            commentService,
                            $route) {
        var model = this;

        var user = $rootScope.currentUser;


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


        model.submit = function() {
            console.log(user);
            model.newComment._author = {
                _id: user._id,
                name: user.firstName + " " + user.lastName,
                image_url: user.picture.url
            };
            model.newComment._discussion = model.post._id;
            console.log('submitting', model.newComment);
            commentService.newReq(model.newComment)
                .then(function (coms) {
                    model.comments.push(model.newComment);
                    model.newComment = null;
                    $route.reload();
                }, function (err) {
                    model.comments.push(model.newComment);
                    model.newComment = null;
                    $route.reload();
                })
        }
    }


    function newPostController($rootScope, postService) {
        var model = this;
        var user = $rootScope.currentUser;

        model.submit = function() {
            console.log(user);
            model.post._author = {
                _id: user._id,
                name: user.firstName + " " + user.lastName,
                imageUrl: user.picture.url
            };
            console.log('submitting', model.post);
            postService.newReq(model.post)
                .then(function (then) {
                    $location.url('/');
                })
        }
    }

})();