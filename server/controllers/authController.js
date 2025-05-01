const axios = require('axios');
const API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getWeather = async (req, res) => {
    try {
        const { city } = req.query;
        
        // Get current weather
        const currentResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        // Get forecast
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        res.json({
            current: currentResponse.data,
            forecast: forecastResponse.data
        });
    } catch (error) {
        console.error('Weather API error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};