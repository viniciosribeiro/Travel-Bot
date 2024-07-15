const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  info: { type: String, required: true }
});

module.exports = mongoose.model('Data', dataSchema);
