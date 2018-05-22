const express = require('express');
const mongoose = require('mongoose');
require('../models/Task');
const Task = mongoose.model('tasks');

module.exports = function (router) {
    router.get('/tasks', (req, res) => {
        Task.find({}).then(tasks => {
            res.status(200).send(tasks);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    router.get('/task/:id', (req, res) => {
        Task.findById(req.params.id).then(task => {
            res.status(200).send(task);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    router.post('/task', (req, res) => {
        const newTask = new Task({
            title: req.body.title,
            summary: req.body.summary,
            date: req.body.date
        });

        newTask.save().then(task => {
            res.status(200).send(task);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    router.put('/task/:id', (req, res) => {
        Task.findOne({
            _id: req.params.id
        }).then(task => {
            task.title = req.body.title;
            task.summary = req.body.summary;
            task.date = req.body.date;

            task.save().then(taskResult => {
                res.status(200).send(task);
            });
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    router.delete('/:id', (req, res) => {
        Task.remove({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).send(true);
            }).catch(err => {
                res.status(500).send(err);
            });
    });
}