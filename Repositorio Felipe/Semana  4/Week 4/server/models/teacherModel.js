const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacher = new Schema({
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String }
});

module.exports = mongoose.model('teacher', teacher);