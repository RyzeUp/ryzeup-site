/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .directive('representativeItem', representativeItem);

    function representativeItem() {
        return {
            require: "ngModel",
            scope: {
                model: "=model",
                rep:   "=representative"
            },
            templateUrl: "/directives/congress/representative.item.view.client.html"
        };
    }
})();