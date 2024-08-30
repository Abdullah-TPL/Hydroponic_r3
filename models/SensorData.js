const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  Ph: String,
  TDS: String,
  InternalTemperature: String,
  ExternalTemperature: String,
  Humidity: String,
  ReservoirWaterLevel: String,
  FanTimer: String,
  TemperatureSetpoint: String,
  HumiditySetpoint: String,
  Timestamp: { type: Date, default: Date.now },
  DeviceName: String, 
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
