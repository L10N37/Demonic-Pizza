const { Schema, model } = require('mongoose');

const extraSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Extra = model('Extra', extraSchema);

module.exports = Extra;
