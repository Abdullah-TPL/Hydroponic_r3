// controllers/sensorSettingsController.js
const SensorSettings = require('../models/SensorSettings'); // Use this if needed for other purposes
const SensorRecords = require('../models/SensorRecords');

const moment = require('moment-timezone');

exports.updateSensorSettings = async (req, res) => {
  const {
    "Temperature Low": TemperatureLo,
    "Temperature High": TemperatureUp,
    "Humidity Low": HumidityLo,
    "Humidity High": HumidityUp,
    "pH low": pH_Lo,
    "pH high": pH_Up,
    "EC low": EC_Lo,
    "EC high": EC_Up,
    "Light Duration": LightDuration,
      DeviceName,
  } = req.body;

  try {
    const sensorSettingsData = {
      TemperatureLo,
      TemperatureUp,
      HumidityLo,
      HumidityUp,
      EC_Lo,
      EC_Up,
      LightDuration,
      pH_Lo,
      pH_Up,
      Timestamp: moment().tz('Asia/Karachi').toDate(),
      DeviceName,
    };

    // Insert into SensorRecords collection
    const result1 = await SensorRecords.create(sensorSettingsData);

    // Insert into SensorSettings collection
    const result2 = await SensorSettings.create(sensorSettingsData);
    
    // Respond with both inserted IDs
    res.status(200).json({
      status: 'OK',
      insertedIdSensorRecords: result1._id,
      insertedIdSensorSettings: result2._id
    });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

exports.getLatestSensorSettings = async (req, res) => {
  try {
    const deviceName = req.query.deviceName; // Get the device name from the query parameter

    // Check if deviceName is provided
    if (!deviceName) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Device name is required',
      });
    }

    // Find the latest sensor settings for the specified device
    const sensorSettings = await SensorSettings.findOne({ DeviceName: deviceName }).sort({ Timestamp: -1 });

    if (sensorSettings) {
      // Delete all sensor settings for this device
      await SensorSettings.deleteMany({ DeviceName: deviceName });

      // Respond with the latest sensor settings
      res.status(200).json({ status: 'OK', data: sensorSettings });
    } else {
      res.status(404).json({ status: 'Not Found', message: `No sensor settings found for device: ${deviceName}` });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};
