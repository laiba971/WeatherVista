// Sample weather data (in real app, you would use an API)
const sampleWeatherData = {
    location: "New York, US",
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    current: {
        temp: 24,
        condition: "Sunny",
        icon: "sunny",
        wind: 12,
        humidity: 45,
        precipitation: 10
    },
    hourly: [
        { time: "Now", temp: 24, icon: "sunny" },
        { time: "1 PM", temp: 25, icon: "sunny" },
        { time: "2 PM", temp: 26, icon: "partly-cloudy" },
        { time: "3 PM", temp: 25, icon: "partly-cloudy" },
        { time: "4 PM", temp: 24, icon: "cloudy" },
        { time: "5 PM", temp: 23, icon: "cloudy" },
        { time: "6 PM", temp: 22, icon: "cloudy" }
    ],
    daily: [
        { day: "Tue", icon: "sunny", high: 26, low: 18 },
        { day: "Wed", icon: "partly-cloudy", high: 25, low: 17 },
        { day: "Thu", icon: "rain", high: 22, low: 16 },
        { day: "Fri", icon: "rain", high: 21, low: 15 },
        { day: "Sat", icon: "cloudy", high: 23, low: 17 }
    ]
};

// DOM Elements
const cityNameEl = document.getElementById('cityName');
const currentDateEl = document.getElementById('currentDate');
const currentTempEl = document.getElementById('currentTemp');
const weatherIconEl = document.getElementById('weatherIcon');
const weatherDescEl = document.getElementById('weatherDesc');
const windSpeedEl = document.getElementById('windSpeed');
const humidityEl = document.getElementById('humidity');
const precipitationEl = document.getElementById('precipitation');
const hourlyForecastEl = document.getElementById('hourlyForecast');
const dailyForecastEl = document.getElementById('dailyForecast');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize dashboard
function initDashboard() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('weatherUser'));
    if (!user || !user.loggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Set username if available
    if (user.name) {
        document.getElementById('username').textContent = user.name;
    } else if (user.email) {
        document.getElementById('username').textContent = user.email.split('@')[0];
    }
    
    // Load weather data
    loadWeatherData(sampleWeatherData);
    
    // Setup event listeners
    searchBtn.addEventListener('click', handleSearch);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('weatherUser');
            window.location.href = 'login.html';
        });
    }
}

// Handle city search
function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        // In a real app, you would fetch weather data here
        alert(`Searching for weather in ${city}...`);
        cityInput.value = '';
    }
}

// Load weather data into UI
function loadWeatherData(data) {
    cityNameEl.textContent = data.location;
    currentDateEl.textContent = data.date;
    currentTempEl.textContent = data.current.temp;
    weatherIconEl.src = `assets/${data.current.icon}.png`;
    weatherDescEl.textContent = data.current.condition;
    windSpeedEl.textContent = `${data.current.wind} km/h`;
    humidityEl.textContent = `${data.current.humidity}%`;
    precipitationEl.textContent = `${data.current.precipitation}%`;
    
    // Load hourly forecast
    hourlyForecastEl.innerHTML = '';
    data.hourly.forEach(hour => {
        hourlyForecastEl.innerHTML += `
            <div class="hourly-item">
                <p>${hour.time}</p>
                <img src="assets/${hour.icon}.png" alt="${hour.icon}">
                <p>${hour.temp}°</p>
            </div>
        `;
    });
    
    // Load daily forecast
    dailyForecastEl.innerHTML = '';
    data.daily.forEach(day => {
        dailyForecastEl.innerHTML += `
            <div class="daily-item">
                <p>${day.day}</p>
                <img src="assets/${day.icon}.png" alt="${day.icon}">
                <div class="temps">
                    <span class="high">${day.high}°</span>
                    <span class="low">${day.low}°</span>
                </div>
            </div>
        `;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);