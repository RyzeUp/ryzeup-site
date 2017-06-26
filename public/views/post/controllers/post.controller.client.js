/**
 * Created by Nick on 6/25/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('postController', postController)
        .controller('newPostController', newPostController);

    function postController($routeParams,
                            billsService,
                            postService,
                            commentService) {
        var model = this;

        function init() {
            postService.detailsReq($routeParams['postid'])
                .then(function (res) {
                    model.post = res;
                    console.log(model.post);
                });

            commentService.commentsReq($routeParams['postid'])
                .then(function (res) {
                    model.comments = res;
                    console.log('hello comments');
                    console.log(model.comments);
                });
            /*
             var temp = {
             _id: $routeParams['postid'],
             title: 'title',
             text: 'text',
             billId: 'hr21-115',
             _author: {
             _id: 'authorId',
             name: 'Barack Obama',
             imageUrl: 'authorImageUrl'
             }
             };
             model.post = temp;
             billsService.details('hr21-115')
             .then(function (response) {
             console.log(response);
             model.post.bill = response;
             });

             model.comments = [];
             for (var i = 0; i < 10; i++) {
             var temp = {
             _id: i,
             _discussion: $routeParams['postid'],
             dateCreated: Date.now(),
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
             */
        }

        init();

        model.followPost = function (postid) {
            //TODO FOLLOW
        };
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
            postService.newReq(model.post);
        }
    }
})();