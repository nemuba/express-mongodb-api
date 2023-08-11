// Database Mongo Client
// Users collection
const mongoose = require('../db');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  type: { type: String, required: true, index: true },
}, {
  timestamps: true,
  collection: 'users',
  versionKey: false,
  createIndexes: true,
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;