// middleware/auth.js

// Simple API key authentication middleware
// Expects header: x-api-key: <key>

const apiKey = process.env.API_KEY || 'secret-api-key';

module.exports = function auth(req, res, next) {
  const key = req.header('x-api-key');
  if (!key) {
    return res.status(401).json({ error: 'Missing API key' });
  }
  if (key !== apiKey) {
    return res.status(403).json({ error: 'Invalid API key' });
  }
  next();
};
