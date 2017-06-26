/**
 * Created by westinn on 6/22/17.
 */
(function () {
    angular
        .module('RU')
        .controller('representativeController', representativeController)
        .controller('membersController', membersController);

    function representativeController($routeParams,
                                      congressService) {
        var model = this;

        function init() {
            var repId = $routeParams['repid'];
            congressService.detailsReq(repId)
                .then(
                    function (res) {
                        model.rep = res;
                        setCurrentDetails();
                        console.log(model.rep);
                    });

            function setCurrentDetails() {
                var role = model.rep.roles[0];
                var representative = {
                    contact: {}
                };
                if (model.rep.member_id) {
                    representative.id = model.rep.member_id;
                }
                if (model.rep.first_name) {
                    representative.first_name = model.rep.first_name;
                }
                if (model.rep.middle_name) {
                    representative.middle_name = model.rep.middle_name;
                }
                if (model.rep.last_name) {
                    representative.last_name = model.rep.last_name;
                }
                if (model.rep.date_of_birth) {
                    representative.dob = model.rep.date_of_birth;
                }
                if (model.rep.gender) {
                    representative.gender = model.rep.gender;
                }
                if (model.rep.most_recent_vote) {
                    representative.most_recent_vote = model.rep.most_recent_vote;
                }
                if (role.title) {
                    representative.title = role.title;
                }
                if (role.chamber) {
                    representative.chamber = role.chamber;
                }
                if (role.state) {
                    representative.state = role.state;
                }
                if (role.party) {
                    representative.party = role.party;
                }
                if (role.start_date) {
                    representative.currentTermStart = role.start_date;
                }
                if (role.end_date) {
                    representative.currentTermEnd = role.end_date;
                }
                if (role.seniority) {
                    representative.seniority = role.seniority;
                }
                if (role.senate_class) {
                    representative.senate_class = role.senate_class;
                }
                if (role.bills_sponsored) {
                    representative.bills_sponsored = role.bills_sponsored;
                }
                if (role.bills_cosponsored) {
                    representative.bills_cosponsored = role.bills_cosponsored;
                }
                if (role.missed_votes_pct) {
                    representative.missed_votes_pct = role.missed_votes_pct;
                }
                if (role.votes_with_party_pct) {
                    representative.votes_with_party_pct = role.votes_with_party_pct;
                }
                if (role.committees.length > 0) {
                    representative.committees = role.committees;
                }
                if (model.rep.facebook_account) {
                    representative.contact.facebook = "http://facebook.com/" + model.rep.facebook_account;
                }
                if (model.rep.twitter_account) {
                    representative.contact.twitter = "http://twitter.com/" + model.rep.twitter_account;
                }
                if (model.rep.youtube_account) {
                    representative.contact.youtube = "http://youtube.com/" + model.rep.youtube_account;
                }
                if (model.rep.url) {
                    representative.contact.url = model.rep.url;
                }
                if (model.rep.rss_url) {
                    representative.contact.rss = model.rep.rss_url;
                }
                if (role.phone) {
                    representative.contact.phone = role.phone;
                }
                if (role.fax) {
                    representative.contact.fax = role.fax;
                }
                model.rep = representative;
            }
        }

        init();
        model.showPhone = function (number) {
            alert(number);
        };
    }

    function membersController(congressService) {
        model = this;
        congressService.senateReq()
            .then(
                function (res) {
                    model.senate = res.members;
                    console.log(model.senate);
                });
        congressService.houseReq()
            .then(
                function (res) {
                    model.house = res.members;
                    console.log(model.house);
                });
    }

})();