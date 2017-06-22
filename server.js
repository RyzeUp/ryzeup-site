/**
 * Created by vcantu on 5/22/17.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
var session      = require('express-session');
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true }));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// expose node_module libs
app.use('/scripts', express.static(__dirname + '/node_modules/ngtweet/dist/'));


// expose images
app.use('/assets', express.static(__dirname + '/assets'));!

require('./private/app.js')(app);

var port = process.env.PORT || 3000;

app.listen(port);