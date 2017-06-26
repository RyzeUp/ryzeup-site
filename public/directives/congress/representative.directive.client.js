/**
 * Created by vcantu on 6/23/17.
 */

(function () {
    angular
        .module('RU')
        .controller('representativeController', representativeController)
        .directive('representativeItem', representativeItem);

    function representativeController($rootScope, $location, authService, $scope) {
        this.userImgUrl = $rootScope.currentUser.picture.url;
        this.isAdmin = $rootScope.currentUser.role === 'admin';

        this.goToDetailsPage = function(repId) {
            $location.url('/representative/details/' + repId);
        };

        this.setContact = function(rep) {
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
        };

        this.setContact($scope.rep);
    }

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