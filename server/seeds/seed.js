const mongoose = require('mongoose');
const db = require('../config/connection');

const Pizza = require('../models/Pizza');
const Pasta = require('../models/Pasta');
const Side = require('../models/Side');
const Crust = require('../models/Crust'); 
const Extra = require('../models/Extra'); // Add this line

const data = require('./pizzaData.json');

const pizzaData = data.pizzas;
const pastaData = require('./pastaData.json');
const sideData = require('./sideData.json');
const crustData = require('./crustData.json');
const extraData = require('./extraData.json');

db.once('open', async () => {
  try {
    await Pizza.deleteMany({});
    await Pasta.deleteMany({});
    await Side.deleteMany({});
    await Crust.deleteMany({});
    await Extra.deleteMany({}); // Add this line

    await Pizza.create(pizzaData);
    await Pasta.create(pastaData);
    await Side.create(sideData);
    await Crust.insertMany(crustData.crusts);
    await Extra.insertMany(extraData.extras); // Add this line
    

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
