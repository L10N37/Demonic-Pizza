const mongoose = require('mongoose');

const ExtraSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Extra', ExtraSchema);
