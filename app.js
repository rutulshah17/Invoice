var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//passport dependencies
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var invoices = require('./routes/invoices');

var app = express();

// use mongoose to connect to mongodb
var mongoose = require('mongoose');
var conn = mongoose.connection;

// link to config file
var globals = require('./config/globals');

conn.open(globals.db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport and sessions
app.use(session({
    secret: 'some value',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// link to the new Account model
let Account = require('./models/account');
passport.use(Account.createStrategy());


//facebook auth
let FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: globals.facebook.clientID,
        clientSecret: globals.facebook.clientSecret,
        callbackURL: globals.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        Account.findOrCreate({ facebookId: profile.id }, {
            facebookId: profile.id,
            username: profile.displayName
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

//Twitter Strategy
let TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
        consumerKey: globals.twitter.consumerKey,
        consumerSecret: globals.twitter.consumerSecret,
        callbackURL: globals.twitter.callbackURL
    },
    function (token, tokenSecret, profile, cb) {
        Account.findOrCreate({twitterId: profile.id}, {
            twitterId: profile.id,
            username: profile.username
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

// manage user login status through the db
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(function (req,res,next) {
    res.locals.message = "";
    res.locals.user = req.user;
    next();
});
app.use('/users', users);
app.use('/invoices', invoices);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
