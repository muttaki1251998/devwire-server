// db.js

const mongoose = require('mongoose');

const connectToDB = async (uri) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database!');
  } catch (error) {
    console.error('Failed to connect to database!', error);
  }
}

module.exports = { connectToDB };
