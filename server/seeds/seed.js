// seed.js

const mongoose = require('mongoose');
const db = require('../config/connection');

const Pizza = require('../models/Pizza');
const Pasta = require('../models/Pasta');
const Side = require('../models/Side');

const data = require('./pizzaData.json');

const pizzaData = data.pizzas;
const pastaData = require('./pastaData.json');
const sideData = require('./sideData.json'); // Import both sides and drinks together

db.once('open', async () => {
  try {
    await Pizza.deleteMany({});
    await Pasta.deleteMany({});
    await Side.deleteMany({});

    await Pizza.create(pizzaData);
    await Pasta.create(pastaData);
    await Side.create(sideData);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
