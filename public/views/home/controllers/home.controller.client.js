/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController($location,
                            congressService,
                            billsService) {
        var model = this;

        function init() {
            congressService.senateReq()
                .then(
                    function (res) {
                        model.senate = res.members;
                        console.log(model.senate);
                    });
            // congressService.houseReq()
            //     .then(
            //         function (res) {
            //             model.house = res.members;
            //             setContact(model.house);
            //             console.log(model.house);
            //         });

            billsService.updated('house')
                .then(function (res) {
                    console.log(res.bills);
                    model.bills = res.bills;
                });

            model.posts = [];
            for (var i = 0; i < 10; i++) {
                var temp = {
                    title: 'title',
                    text: 'text',
                    billId: 'billId',
                    _author: {
                        _id: 'authorId',
                        name: 'Barack Obama',
                        imageUrl: 'authorImageUrl'
                    }
                };
                billsService.details('hr21-115')
                    .then(function (response) {
                        temp.bill = response.data;
                        model.posts.push(temp);
                    });
            }
        }

        init();

        model.showPhone = function (number) {
            alert(number);
        };

        model.getBillById = function (billId) {
            billsService.details(billId);
        };

        model.trunc = function (str) {
            return (this.length > 140) ? this.substr(0, n - 1) + '&hellip;' : this;
        };
    }
})();