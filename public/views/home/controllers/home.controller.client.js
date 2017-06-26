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
                        setContact(model.senate);
                        console.log(model.senate);
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
                        console.log(response);
                        temp.bill = response;
                        model.posts.push(temp);
                    });
            }
            console.log('set test posts');
            console.log(model.posts);
        }

        init();

        model.showPhone = function (number) {
            alert(number);
        };

        model.goToRepDetailsPage = function (repId) {
            $location.url('/representative/details/' + repId);
        };

        model.goToPostDetailsPage = function () {
            $location.url('/post/details/' + postId);
        };

        model.followPost = function (postid) {
            //TODO FOLLOW
        };

        model.getBillById = function (billId) {
            billsService.details(billId);
        };
    }
})();