const User = require('../models/User');

module.exports = function (accessToken, refreshToken, profile, done) {
  var searchQuery = {
    name: profile.displayName
  };

  var updates = {
    name: profile.displayName,
    someID: profile.id
  };

  var options = {
    upsert: true
  };

  User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });
}