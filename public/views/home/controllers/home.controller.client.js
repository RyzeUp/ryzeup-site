/**
 * Created by vcantu on 5/31/17.
 */
(function () {
    angular
        .module('RU')
        .controller('homeController', homeController);

    function homeController(congressService) {
        var model = this;

        function init() {
            congressService.senateReq()
                .then(
                    function (res) {
                        model.senate = res.members;
                        setContact(model.senate);
                        console.log(model.senate);
                        model.currentChamber = true;
                    });
            congressService.houseReq()
                .then(
                    function (res) {
                        model.house = res.members;
                        setContact(model.house);
                        console.log(model.house);
                    });


            function setContact(representatives) {
                representatives.forEach(function (rep) {
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
                });
            }
        }

        init();

        model.goto = function (chamber) {
            if (chamber == 'senate') {
                model.currentChamber = true;
                console.log('changed to senate');
            } else if (chamber == 'house') {
                model.currentChamber = false;
                console.log('changed to house');
            }
        };
    }
})();