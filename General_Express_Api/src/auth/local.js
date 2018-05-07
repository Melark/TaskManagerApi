const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');

const User = require('../models/User');
const init = require('./init');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
