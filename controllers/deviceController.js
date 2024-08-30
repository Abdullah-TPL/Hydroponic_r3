const Device = require('../models/device');

// Get all devices
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json({ status: 'OK', devices });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

// Add a new device
exports.addDevice = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ status: 'Bad Request', message: 'Device name is required' });
  }

  try {
    const newDevice = new Device({ name });
    await newDevice.save();
    res.status(201).json({ status: 'Created', message: 'Device added successfully', device: newDevice });
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

// Update a device
exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ status: 'Bad Request', message: 'Device name is required' });
  }

  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (updatedDevice) {
      res.status(200).json({ status: 'OK', message: 'Device updated successfully', device: updatedDevice });
    } else {
      res.status(404).json({ status: 'Not Found', message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Device.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ status: 'OK', message: 'Device deleted successfully' });
    } else {
      res.status(404).json({ status: 'Not Found', message: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'Internal Server Error', error: error.message });
  }
};
