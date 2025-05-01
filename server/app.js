// server/app.js

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if frontend runs on different port or path
  credentials: true
}));
app.use(express.json());

// Serve static frontend files from 'clients' folder
app.use(express.static(path.join(__dirname, '../clients')));

// API Routes
const weatherRoutes = require('./routes/weather');
app.use('/api', weatherRoutes);

// Example test route
app.get('/api/weather', (req, res) => {
  res.json({ temp: '25°C', condition: 'Sunny' });
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
