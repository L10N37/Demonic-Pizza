const { Schema, model } = require('mongoose');

const sideSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Side = model('Side', sideSchema);

module.exports = Side;
