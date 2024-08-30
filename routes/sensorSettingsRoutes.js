const express = require('express');
const router = express.Router();
const SensorSettingsController = require('../controllers/sensorSettingsController');

// Route to update sensor settings
router.post('/updatesensorsettings', SensorSettingsController.updateSensorSettings);

// Route to get the latest sensor settings
router.get('/getsensorsettings', SensorSettingsController.getLatestSensorSettings);

module.exports = router;
