const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String
});

module.exports = mongoose.model('Token', tokenSchema);