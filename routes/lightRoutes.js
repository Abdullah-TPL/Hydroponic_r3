const express = require('express');
const router = express.Router();
const lightController = require('../controllers/lightController');

router.post('/updatelighttimer', lightController.updateLightTimer);
router.get('/getlighttimer', lightController.getLatestManualLightTimer);

module.exports = router;
