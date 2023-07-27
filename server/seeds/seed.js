// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');
// Import models for Pizza, Pasta and Side
const { Pizza, Pasta, Side } = require('../models');
// Import data to seed the database
const pizzaData = require('./pizzaData.json');
const pastaData = require('./pastaData.json');
const sideData = require('./sideData.json');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/demonic-pizza');

// Get a reference to the database connection
const db = mongoose.connection;

// If there's an error connecting to the database, log the error
db.on('error', console.error.bind(console, 'connection error:'));

// Once the database connection is open
db.once('open', () => {
  // Log successful database connection
  console.log('Database connected');

  // Insert the pizza data into the Pizza collection
  Pizza.insertMany(pizzaData)
    .then(() => console.log("Pizza data inserted")) // Log successful data seeding
    .catch(err => console.error(err)); // If there's an error, log the error

  // Insert the pasta data into the Pasta collection
  Pasta.insertMany(pastaData)
    .then(() => console.log("Pasta data inserted")) // Log successful data seeding
    .catch(err => console.error(err)); // If there's an error, log the error

  // Insert the side data into the Side collection
  Side.insertMany(sideData)
    .then(() => console.log("Side data inserted")) // Log successful data seeding
    .catch(err => console.error(err)); // If there's an error, log the error
});
