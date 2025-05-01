const axios = require('axios');

exports.getWeather = async (req, res) => {
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ message: 'API key is not configured on the server' });
    }

    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }

    try {
        const currentWeather = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather',
            {
                params: {
                    q: city,
                    units: 'metric',
                    appid: API_KEY
                }
            }
        );

        const forecast = await axios.get(
            'https://api.openweathermap.org/data/2.5/forecast',
            {
                params: {
                    q: city,
                    units: 'metric',
                    appid: API_KEY
                }
            }
        );

        res.json({
            current: currentWeather.data,
            forecast: forecast.data
        });
    } catch (error) {
        console.error('Weather API error:', error.response?.data || error.message);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || 'Error fetching weather data';
        res.status(status).json({ message });
    }
};
