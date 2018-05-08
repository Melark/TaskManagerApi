const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const config = require('../config/keys');
const init = require('./init');
const auth = require('./auth-helper');

passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  (accessToken, refreshToken, profile, done) => auth(accessToken, refreshToken, profile, done)
));

init();

module.exports = passport;