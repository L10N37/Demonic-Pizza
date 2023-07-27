const { Schema, model } = require('mongoose');

const pizzaSchema = new Schema({
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
});

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;
