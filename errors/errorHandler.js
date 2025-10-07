// errors/errorHandler.js

const { AppError } = require('./customErrors');

function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Route not found' });
}

function errorHandler(err, req, res, next) {
  // If error is an AppError (custom), use its status and message
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };
