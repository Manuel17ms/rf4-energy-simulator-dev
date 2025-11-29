
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Location = require('../models/Location');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rf4db';

async function main() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB for seeding');

    const dataPath = path.join(__dirname, '..', 'data', 'seedLocations.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const locations = JSON.parse(raw);

    await Location.deleteMany({});
    await Location.insertMany(locations);
    console.log('Seeded locations:', locations.length);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

main();
