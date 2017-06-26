/**
 * Created by vcantu on 6/26/17.
 */
/**
 * Created by vcantu on 6/20/17.
 */
const q = require('q');
const https = require('https');
const bcrypt = require('bcrypt-nodejs');

var userModel    = require('../models/user/user.model.server');
var postModel    = require('../models/post/post.model.server');
var commentModel = require('../models/comment/comment.model.server');

module.exports = function (app) {

    app.get('/dev/v1/generate/users', addDummyUsers);
    app.get('/dev/v1/generate/posts', addDummyPosts);

    // Mock users
    var fakeUsers = [
        {
            firstName: 'Alice',
            lastName: 'Wonderland',
            email: 'alice@email.com',
            password: 'alice'
        },
        {
            firstName: 'Bob',
            lastName: 'Bo',
            email: 'bob@email.com',
            password: 'bob'
        },
        {
            firstName: 'Alex',
            lastName: 'Alex',
            email: 'alex@email.com',
            password: 'alex'
        },
        {
            firstName: 'Mary',
            lastName: 'Ellen',
            email: 'mary@email.com',
            password: 'mary'
        }
    ];

    function addDummyUsers(req, res) {
        console.log('adding dummy users');
        for (var u in fakeUsers) {
            fakeUsers[u].password = bcrypt.hashSync(fakeUsers[u].password);
            fakeUsers[u].picture = {
                is_unset: true,
                url: '/assets/images/profile-images/default-profile.png'
            };
            userModel.createUser(fakeUsers[u])
                .then(function (user) {
                })
        }
        res.sendStatus(200);
    }

    // Mock users
    var fakePosts = [
        {
            author: 'alice@email.com',
            title: 'Why You should care about H.RES.404',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when ' +
            'an unknown printer took a galley of type and scrambled it to make a type ' +
            'specimen book. It has survived not only five centuries, but also the leap ' +
            'into electronic typesetting, remaining essentially unchanged. It was popularised '
        },
        {
            author: 'bob@email.com',
            title: 'You will not believe what Paul Ryan said!',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when ' +
            'an unknown printer took a galley of type and scrambled it to make a type ' +
            'specimen book. It has survived not only five centuries, but also the leap ' +
            'into electronic typesetting, remaining essentially unchanged. It was popularised '
        },
        {
            author: 'alex@email.com',
            title: 'What is congress',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when ' +
            'an unknown printer took a galley of type and scrambled it to make a type ' +
            'specimen book. It has survived not only five centuries, but also the leap ' +
            'into electronic typesetting, remaining essentially unchanged. It was popularised '
        },
        {
            author: 'mary@email.com',
            title: 'STOP H.RES.404!!!!!',
            text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
            'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when ' +
            'an unknown printer took a galley of type and scrambled it to make a type ' +
            'specimen book. It has survived not only five centuries, but also the leap ' +
            'into electronic typesetting, remaining essentially unchanged. It was popularised '
        }
    ];

    function addDummyPosts(req, res) {
        console.log('adding dummy posts');
        for (var u in fakePosts) {
            console.log('looking for ' + fakePosts[u].author);
            userModel.findByEmail(fakePosts[u].author)
                .then(function (user) {
                    console.log('adding post '+u+'to ' + user.firstName);
                    fakePosts[u]._author = {
                        _id: user._id,
                        name: user.firstName + ' ' + user.lastName,
                        imageUrl: user.picture.url
                    };
                    return postModel.createPost(fakePosts[u]);
                })
                .then(function (post) {
                    console.log('added post', post, '\n\n\n\n');
                })
        }
        res.sendStatus(200);
    }

};