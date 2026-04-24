const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Portfolio API running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
