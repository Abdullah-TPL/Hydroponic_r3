const Light = require('../models/Light');
const LightRecord = require('../models/LightRecord');
const moment = require('moment-timezone');

exports.updateLightTimer = async (req, res) => {
  const { LightDuration,DeviceName  } = req.body;
  try {
    const timestamp = moment().tz('Asia/Karachi').toDate();
    
    // Insert into Light collection
    const result1 = await Light.create({
      LightDuration,
      Timestamp: timestamp,
      DeviceName // Add DeviceName
    });

    // Insert into LightRecord collection
    const result2 = await LightRecord.create({
      LightDuration,
      Timestamp: timestamp,
      DeviceName // Add DeviceName
    });

    res.status(200).json({
      status: 'OK',
      insertedIdLight: result1._id,
      insertedIdLightRecord: result2._id
    });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

exports.getLatestManualLightTimer = async (req, res) => {
  try {
    const deviceName = req.query.deviceName; // Get the device name from the query parameter

    // Check if deviceName is provided
    if (!deviceName) {
      return res.status(400).json({
        status: 'Bad Request',
        message: 'Device name is required',
      });
    }

    // Find the latest document for the specified device in the Light collection
    const manualLightTimer = await Light.findOne({ DeviceName: deviceName }).sort({ Timestamp: -1 });

    if (manualLightTimer) {
      // Delete all documents for this device from the Light collection
      await Light.deleteMany({ DeviceName: deviceName });

      // Respond with the latest document's LightDuration and DeviceName
      res.status(200).json({
        status: 'OK',
        data: {
          manualLightTimer: manualLightTimer.LightDuration,
          deviceName: manualLightTimer.DeviceName,
        },
      });
    } else {
      res.status(404).json({
        status: 'Not Found',
        message: `No Manual Light Timer setting found for device: ${deviceName}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Internal Server Error',
      error: error.message,
    });
  }
};
