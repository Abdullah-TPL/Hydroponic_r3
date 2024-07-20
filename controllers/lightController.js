const Light = require('../models/Light');
const LightRecord = require('../models/LightRecord');
const moment = require('moment-timezone');

exports.updateLightTimer = async (req, res) => {
  const { LightDuration } = req.body;
  try {
    const timestamp = moment().tz('Asia/Karachi').toDate();
    
    // Insert into Light collection
    const result1 = await Light.create({
      LightDuration,
      Timestamp: timestamp
    });

    // Insert into LightRecord collection
    const result2 = await LightRecord.create({
      LightDuration,
      Timestamp: timestamp
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
    // Find the latest document in the Light collection
    const manualLightTimer = await Light.findOne().sort({ Timestamp: -1 });

    if (manualLightTimer) {
      // Delete all documents from the Light collection
      await Light.deleteMany({});

      // Respond with the latest document's LightDuration
      res.status(200).json({ 
        status: 'OK', 
        data: { manualLightTimer: manualLightTimer.LightDuration } 
      });
    } else {
      res.status(404).json({ 
        status: 'Not Found', 
        message: 'No Manual Light Timer setting found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'Internal Server Error', 
      error: error.message 
    });
  }
};

