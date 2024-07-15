const mongoose = require('mongoose');
const User = require('../models/userModel');
const Data = require('../models/dataModel');

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function updateDatabase(username, newText) {
  const user = await User.findOne({ username });
  if (user) {
    await Data.updateOne(
      { userId: user._id },
      { info: newText },
      { upsert: true }
    );
  }
}

module.exports = { connectToDatabase, updateDatabase };
