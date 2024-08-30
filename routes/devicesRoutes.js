const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
router.get('/devices', deviceController.getDevices);
router.post('/devices/add', deviceController.addDevice);
router.put('/devices/update/:id', deviceController.updateDevice);
router.delete('/devices/delete/:id', deviceController.deleteDevice);

module.exports = router;
