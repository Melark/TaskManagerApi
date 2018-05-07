const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@ds211440.mlab.com:11440/melarkbd').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err);
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

require('./src/routes/task_route')(app);
require('./src/routes/auth_route')(app);

app.get('/', (req, res) => {
    res.send('Index');
});

app.get('/login',(req,res,next) =>{
    res.send('NOT AUTHENTICATED');
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});