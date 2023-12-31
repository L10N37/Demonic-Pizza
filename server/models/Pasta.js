const { Schema, model } = require('mongoose');

const pastaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  }
});

const Pasta = model('Pasta', pastaSchema);

module.exports = Pasta;
