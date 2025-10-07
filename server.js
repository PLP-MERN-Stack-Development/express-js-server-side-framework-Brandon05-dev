// server.js - Modular Express server for Week 2 assignment

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const productsRouter = require('./routes/products');
const { errorHandler, notFoundHandler } = require('./errors/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(bodyParser.json());

// Custom middleware
app.use(logger);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Visit /api/products');
});

// Mount product routes (auth middleware applied to mutating routes inside router)
app.use('/api/products', productsRouter);

// 404 handler for unknown routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;