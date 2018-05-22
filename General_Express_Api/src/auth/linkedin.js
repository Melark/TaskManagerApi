const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');

const config = require('../config/keys');
const init = require('./init');
const auth = require('./auth-helper');

passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL
  },
  (accessToken, refreshToken, profile, done) => auth(accessToken, refreshToken, profile, done)
));

init();

module.exports = passport;