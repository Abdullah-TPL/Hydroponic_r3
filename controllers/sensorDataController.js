const SensorData = require('../models/SensorData');
const moment = require('moment-timezone');

exports.getLatestSensorData = async (req, res) => {
  try {
    const latestSensorData = await SensorData.find().sort({ Timestamp: -1 }).limit(1);
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
  const sensorData = req.body;
  try {
    const sensorDataWithTimestamp = {
      ...sensorData,
      Timestamp: moment().tz('Asia/Karachi').add(5, 'hours').toDate()
    };
    const result = await SensorData.create(sensorDataWithTimestamp);
    res.status(200).json({ status: 'OK', insertedId: result._id });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};
