// backend/api/likes.js

const axios = require('axios');

module.exports = async (req, res) => {
  const allowedOrigins = [
    'https://aidilsaputrakirsan.github.io',
    'http://localhost:5173'
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://aidilsaputrakirsan.github.io'); // Fallback ke origin produksi
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Menangani preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const response = await axios.get(process.env.GAS_WEB_APP_URL);
      res.status(200).json({ likes: response.data.likes });
    } catch (error) {
      console.error('Error fetching likes:', error);
      res.status(500).json({ error: 'Failed to fetch likes' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post(process.env.GAS_WEB_APP_URL);
      res.status(200).json({ likes: response.data.likes });
    } catch (error) {
      console.error('Error adding like:', error);
      res.status(500).json({ error: 'Failed to add like' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
