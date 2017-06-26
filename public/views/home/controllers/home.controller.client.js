/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($location,
                            congressService,
                            billsService,
                            postService) {
        var model = this;

        function init() {
            billsService.updated('house')
                .then(function (res) {
                    console.log(res.bills);
                    model.bills = res.bills;
                });

             postService.recentReq()
                 .then(function (res) {
                     model.posts = res;
                     console.log('grabbing posts', res);
                     console.log(model.posts);
                 });
        }

        init();

        model.getBillById = function (billId) {
            billsService.details(billId);
        };
    }
})();