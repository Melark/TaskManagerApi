const express = require('express');
const mongoose = require('mongoose');

module.exports = function (router) {
    require('../models/Task');
    const Task = mongoose.model('tasks');

    router.get('/tasks', (req, res) => {
        Task.find({}).then(tasks => {
            res.send(tasks);
        }).catch(err => {
            res.send(err);
        })
    });

    router.get('/task/:id', (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(task);
        });
    });

    router.post('/task', (req, res) => {
        const newTask = new Task({
            title: req.body.title,
            summary: req.body.summary,
            date: req.body.date
        });

        newTask.save().then(user => {
            res.send(user);
        }).catch(err =>{
            console.log(err);
            res.send({});
        });
    });

    router.put('/task/:id', (req, res) => {
        Task.findOne({
            _id: req.params.id
          }).then(task => {
              task.title = req.body.title;
              task.summary = req.body.summary;
              task.date = req.body.date;

              task.save().then(taskResult =>{
                  res.send(true);
              });
          }).catch(err => {
            console.log(err);
            res.send(false);
        });

        newTask.save().then(user => {
            res.send(user);
        }).catch(err =>{
            console.log(err);
            res.send({});
        });
    });

router.delete('/:id', (req, res) => {
    Task.remove({_id: req.params.id})
      .then(() => {
        res.send(true);
      });
  });
}