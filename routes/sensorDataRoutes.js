const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');

router.get('/getsensordata', sensorDataController.getLatestSensorData);
router.post('/sensordata', sensorDataController.addSensorData);

module.exports = router;
