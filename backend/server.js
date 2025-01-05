// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Ganti dengan URL frontend Anda jika berbeda
}));
app.use(express.json());

// Endpoint GET: Mengambil jumlah total like
app.get('/api/likes', async (req, res) => {
  try {
    const response = await axios.get(process.env.GAS_WEB_APP_URL);
    const { likes } = response.data;
    res.json({ likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Failed to fetch likes' });
  }
});

// Endpoint POST: Menambahkan like baru
app.post('/api/likes', async (req, res) => {
  try {
    const response = await axios.post(process.env.GAS_WEB_APP_URL);
    const { likes } = response.data;
    res.json({ likes });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Failed to add like' });
  }
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
