const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);