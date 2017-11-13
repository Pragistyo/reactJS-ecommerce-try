const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, unique:true, required:true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  role: {type: String}
},{timestamps:true})

var user = mongoose.model('user', userSchema);

module.exports = user
