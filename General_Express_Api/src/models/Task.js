const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    date: {
        type: Date
    }
});
 
module.exports = mongoose.model('tasks',taskSchema);