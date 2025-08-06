const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/product');
require("dotenv").config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Read JSON data
    const dataPath = path.join(__dirname, 'data.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Clear existing data if needed
    await Product.deleteMany({});
    console.log('Existing products removed');

    // Insert new data
    await Product.insertMany(jsonData);
    console.log('Database seeded successfully');

    // Disconnect
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
}

seedDatabase();
