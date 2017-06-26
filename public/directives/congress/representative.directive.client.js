/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .controller('RepController', RepController)
        .directive('representativeItem', representativeItem);

    function RepController($location, $scope) {
        var rep = $scope.rep;
        var contact = {};
        if (rep.facebook_account) {
            contact.facebook = "http://facebook.com/" + rep.facebook_account;
        }
        if (rep.twitter_account) {
            contact.twitter = "http://twitter.com/" + rep.twitter;
        }
        if (rep.youtube_account) {
            contact.youtube = "http://youtube.com/" + rep.youtube_account;
        }
        if (rep.url) {
            contact.url = rep.url;
        }
        if (rep.rss_url) {
            contact.rss = rep.rss_url;
        }
        if (rep.phone) {
            contact.phone = rep.phone;
        }
        rep.contact = contact;

        this.goToRepDetailsPage = function (repId) {
            console.log('going to details');
            $location.url('/representative/details/' + repId);
        };

        this.showPhone = function (number) {
            alert(number);
        };
    }

    function representativeItem() {
        return {
            require: "ngModel",
            scope: {
                rep:   "=representative"
            },
            templateUrl: "/directives/congress/representative.item.view.client.html"
        };
    }
})();