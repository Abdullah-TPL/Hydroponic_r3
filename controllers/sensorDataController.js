const SensorData = require('../models/SensorData');
const moment = require('moment-timezone');

exports.getLatestSensorData = async (req, res) => {
  const { deviceName } = req.query; // Retrieve deviceName from query parameters

  try {
    // Create query object based on presence of deviceName
    const query = deviceName ? { DeviceName: deviceName } : {};

    // Find the latest sensor data based on the query
    const latestSensorData = await SensorData.find(query).sort({ Timestamp: -1 }).limit(1);

    if (latestSensorData.length > 0) {
      res.status(200).json({ status: 'OK', data: latestSensorData[0] });
    } else {
      res.status(404).json({ status: 'Not Found', message: 'No sensor data found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

exports.addSensorData = async (req, res) => {
  const { DeviceName, Ph, TDS, InternalTemperature, ExternalTemperature, Humidity, ReservoirWaterLevel, FanTimer, TemperatureSetpoint, HumiditySetpoint } = req.body;

  // Check if DeviceName is present
  if (!DeviceName) {
    return res.status(400).json({ status: 'Bad Request', message: 'DeviceName is required' });
  }

  // Check for required fields
  if (!Ph || !TDS || !InternalTemperature || !ExternalTemperature || !Humidity || !ReservoirWaterLevel || !FanTimer || !TemperatureSetpoint || !HumiditySetpoint) {
    return res.status(400).json({ status: 'Bad Request', message: 'All sensor data fields are required' });
  }

  try {
    const sensorDataWithTimestamp = {
      DeviceName, // Mandatory field
      Ph,
      TDS,
      InternalTemperature,
      ExternalTemperature,
      Humidity,
      ReservoirWaterLevel,
      FanTimer,
      TemperatureSetpoint,
      HumiditySetpoint,
      Timestamp: moment().tz('Asia/Karachi').add(5, 'hours').toDate()
    };

    const result = await SensorData.create(sensorDataWithTimestamp);
    res.status(200).json({ status: 'OK', insertedId: result._id });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};
