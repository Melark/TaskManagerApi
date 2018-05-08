const express = require('express');
const passportLinkedIn = require('../auth/linkedin');
const passportGithub = require('../auth/github');
const passportTwitter = require('../auth/twitter');
const User = require('../models/User');
const passport = require('passport');

module.exports = function (router) {
    router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

    router.get('/auth/linkedin/callback',
        passportLinkedIn.authenticate('linkedin', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.json(req.user);
        });

    router.get('/auth/github', passportGithub.authenticate('github', {
        scope: ['user:email']
    }));

    router.get('/auth/github/callback',
        passportGithub.authenticate('github', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.json(req.user);
        });


    router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

    router.get('/auth/twitter/callback',
        passportTwitter.authenticate('twitter', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.json(req.user);
        });

    router.post('/auth/local/register', (req, res) => {
        User.register(new Account({
            username: req.body.username
        }), req.body.password, function (err, account) {
            if (err) {
                return res.status(500).send(err);
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

    router.post('/auth/local/login', passport.authenticate('local'), function (req, res) {
        res.redirect('/');
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};