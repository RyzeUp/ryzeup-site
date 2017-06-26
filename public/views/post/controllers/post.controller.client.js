/**
 * Created by Nick on 6/25/2017.
 */
(function () {
    angular
        .module('RU')
        .controller('postController', postController);

    function postController($routeParams,
                            billsService,
                            postService) {
        var model = this;

        function init() {
            model.posts = [];
            var temp = {
                title: 'title',
                text: 'text',
                billId: 'hr21-115',
                _author: {
                    _id: 'authorId',
                    name: 'Barack Obama',
                    imageUrl: 'authorImageUrl'
                }
            };
            billsService.details('hr21-115')
                .then(function (response) {
                    console.log(response);
                    temp.bill = response;
                    model.posts.push(temp);
                });
        }
    }

    init();

    model.followPost = function (postid) {
        //TODO FOLLOW
    };
})();