/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .directive('billItem', billItem);

    function billItem() {
        return {
            require: "ngModel",
            scope: {
                bill:   "=bill"
            },
            templateUrl: "/directives/bills/bill.item.view.client.html"
        };
    }
})();