const { Schema, model } = require('mongoose');

const crustSchema = new Schema({
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

const Crust = model('Crust', crustSchema);

module.exports = Crust;
