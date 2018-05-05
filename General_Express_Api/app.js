const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:password@ds211440.mlab.com:11440/melarkbd').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err);
});

require('./src/routes/task_route')(app);

app.get('/', (req, res) => {
    res.send('Index');
});

const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});