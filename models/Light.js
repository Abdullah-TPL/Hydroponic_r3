const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
  LightDuration: String,
  DeviceName: String, // Add this field
  Timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Light', lightSchema);
