const mongoose = require('mongoose');

const LightRecordSchema = new mongoose.Schema({
  LightDuration: String,
  DeviceName: String, // Add this field
  Timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LightRecord', LightRecordSchema);
