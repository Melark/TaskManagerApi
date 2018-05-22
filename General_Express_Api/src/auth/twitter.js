const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const config = require('../config/keys');
const init = require('./init');
const auth = require('./auth-helper');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  (accessToken, refreshToken, profile, done) => auth(accessToken, refreshToken, profile, done)
));

init();

module.exports = passport;