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
            // congressService.senateReq()
            //     .then(
            //         function (res) {
            //             model.senate = res.members;
            //             setContact(model.senate);
            //             console.log(model.senate);
            //         });
            // congressService.houseReq()
            //     .then(
            //         function (res) {
            //             model.house = res.members;
            //             setContact(model.house);
            //             console.log(model.house);
            //         });

        }
        init();


        model.getBillById = function (billId) {
            billsService.details(billId);
        };

        model.trunc = function (str) {
            return (this.length > 140) ? this.substr(0, n - 1) + '&hellip;' : this;
        };
    }
})();