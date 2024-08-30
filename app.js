const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const sensorDataRoutes = require('./routes/sensorDataRoutes');
const lightRoutes = require('./routes/lightRoutes');
const SensorSettingsRoutes = require('./routes/sensorSettingsRoutes');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/devicesRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use(sensorDataRoutes);
app.use(lightRoutes);
app.use(SensorSettingsRoutes);
app.use(authRoutes);
app.use(deviceRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
