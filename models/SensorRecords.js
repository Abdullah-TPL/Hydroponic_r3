const mongoose = require('mongoose');

const SensorRecordsSchema = new mongoose.Schema({
  TemperatureLo: String,
  TemperatureUp: String,
  HumidityLo: String,
  HumidityUp: String,
  EC_Lo: String,
  EC_Up: String,
  LightDuration: String,
  pH_Lo: String,
  pH_Up: String,
  Timestamp: { type: Date, default: Date.now },
  DeviceName: String, 
});

module.exports = mongoose.model('SensorRecords', SensorRecordsSchema);
