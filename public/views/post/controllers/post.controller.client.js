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
            for (var i = 0; i < 10; i++) {
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
                model.posts.push(temp);

                billsService.details('hr21-115')
                    .then(function (response) {
                        console.log(response.data);
                        temp.bill = response.data;
                        model.posts.push(temp);
                    });
            }
            //postService.grabPosts()
            //.then(
            //function (res) {
            //model.posts = res;
            //console.log(model.posts);
            //});
        }

        init();

        model.trunc = function (str) {
            return (this.length > 140) ? this.substr(0, n - 1) + '&hellip;' : this;
        };
    }
})();