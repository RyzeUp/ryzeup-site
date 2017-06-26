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
            /*postService.detailsReq($routeParams['postid'])
             .then(function () {

             });
             */
            var temp = {
                _id: '123',
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

            commentService.commentsReq()
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
    }
})();