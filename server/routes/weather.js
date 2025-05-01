const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather?city=CityName
router.get('/weather', weatherController.getWeather);

module.exports = router;
